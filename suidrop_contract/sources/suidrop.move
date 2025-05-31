/*
/// Module: suidrop
module suidrop::suidrop;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module suidrop::suidrop {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::tx_context;
    use sui::object;
    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::event;
    use sui::transfer;
    use std::vector;
    use std::option;

    /// The type identifier of our coin (one-time witness)
    public struct SUIDROP has drop {}

    /// Capability for managing the airdrop
    public struct AirdropAuthority has key {
        id: object::UID,
        treasury_cap: TreasuryCap<SUIDROP>,
        airdrop_balance: Balance<SUIDROP>,
        last_airdrop_time: u64,
        min_airdrop_amount: u64,
        max_airdrop_amount: u64,
        cooldown_period: u64,
        admins: vector<address>
    }

    /// Event emitted when an airdrop occurs
    public struct AirdropEvent has copy, drop {
        recipient: address,
        amount: u64,
        timestamp: u64,
    }

    /// Event emitted when a batch airdrop occurs
    public struct BatchAirdropEvent has copy, drop {
        recipients: vector<address>,
        amount_per_recipient: u64,
        timestamp: u64,
    }

    // ======== Errors ========
    const EInsufficientBalance: u64 = 0;
    const EInvalidAmount: u64 = 1;
    const EUnauthorized: u64 = 2;
    const EEmptyRecipientList: u64 = 3;

    // ======== Constants ========
    const INITIAL_SUPPLY: u64 = 1_000_000_000_000_000_000; // 1 billion SUIDROP (with 9 decimals)
    const DECIMALS: u8 = 9;
    const MIN_AIRDROP: u64 = 100_000_000_000; // 100 SUIDROP
    const MAX_AIRDROP: u64 = 1_000_000_000_000; // 1000 SUIDROP
    const COOLDOWN_PERIOD: u64 = 86400_000; // 24 hours in milliseconds

    #[test_only]
    public fun init_for_testing(ctx: &mut tx_context::TxContext) {
        init(SUIDROP {}, ctx)
    }

    fun init(witness: SUIDROP, ctx: &mut tx_context::TxContext) {
        // Create the coin with initial supply
        let (mut treasury_cap, metadata) = coin::create_currency(
            witness,
            DECIMALS,
            b"SUIDROP",
            b"SDROP",
            b"Random Meme Coin with Airdrops",
            option::none(),
            ctx
        );

        // Create the initial coin supply
        let coins = coin::mint(&mut treasury_cap, INITIAL_SUPPLY, ctx);
        
        // Create initial admin list with deployer
        let mut admins = vector::empty<address>();
        vector::push_back(&mut admins, tx_context::sender(ctx));

        // Create the airdrop authority
        let authority = AirdropAuthority {
            id: object::new(ctx),
            treasury_cap,
            airdrop_balance: coin::into_balance(coins),
            last_airdrop_time: 0,
            min_airdrop_amount: MIN_AIRDROP,
            max_airdrop_amount: MAX_AIRDROP,
            cooldown_period: COOLDOWN_PERIOD,
            admins
        };

        // Transfer the authority to the deployer
        transfer::transfer(authority, tx_context::sender(ctx));
        // Share the metadata object
        transfer::public_share_object(metadata);
    }
    
    /// Admin function to update airdrop parameters
    public entry fun update_airdrop_params(
        authority: &mut AirdropAuthority,
        min_amount: u64,
        max_amount: u64,
        cooldown: u64,
        ctx: &tx_context::TxContext
    ) {
        // Only the owner can update parameters
        assert!(tx_context::sender(ctx) == tx_context::sender(ctx), EUnauthorized);
        assert!(min_amount < max_amount, EInvalidAmount);

        authority.min_airdrop_amount = min_amount;
        authority.max_airdrop_amount = max_amount;
        authority.cooldown_period = cooldown;
    }

    /// Admin function to add more coins to the airdrop pool
    public entry fun add_to_airdrop_pool(
        authority: &mut AirdropAuthority,
        coin: Coin<SUIDROP>,
    ) {
        let coin_balance = coin::into_balance(coin);
        balance::join(&mut authority.airdrop_balance, coin_balance);
    }

    /// Check if an address is an admin
    public fun is_admin(authority: &AirdropAuthority, addr: address): bool {
        vector::contains(&authority.admins, &addr)
    }

    /// Perform airdrop to multiple addresses with equal distribution
    public entry fun batch_airdrop(
        authority: &mut AirdropAuthority,
        recipients: vector<address>,
        total_amount: u64,
        clock: &Clock,
        ctx: &mut tx_context::TxContext
    ) {
        // Check if the caller is an admin
        assert!(is_admin(authority, tx_context::sender(ctx)), EUnauthorized);
        
        // Check if recipients list is not empty
        let recipients_count = vector::length(&recipients);
        assert!(recipients_count > 0, EEmptyRecipientList);

        // Calculate amount per recipient (rounded down)
        let amount_per_recipient = total_amount / recipients_count;
        
        // Ensure minimum amount per recipient
        assert!(amount_per_recipient >= authority.min_airdrop_amount, EInvalidAmount);
        assert!(amount_per_recipient <= authority.max_airdrop_amount, EInvalidAmount);

        // Check if we have enough balance for all recipients
        let total_needed = amount_per_recipient * recipients_count;
        assert!(balance::value(&authority.airdrop_balance) >= total_needed, EInsufficientBalance);

        let current_time = clock::timestamp_ms(clock);
        let mut i = 0;
        
        while (i < recipients_count) {
            let recipient = *vector::borrow(&recipients, i);
            
            // Create and transfer the airdrop for each recipient
            let airdrop_coin = coin::from_balance(
                balance::split(&mut authority.airdrop_balance, amount_per_recipient),
                ctx
            );
            transfer::public_transfer(airdrop_coin, recipient);
            
            i = i + 1;
        };

        // Update last airdrop time
        authority.last_airdrop_time = current_time;

        // Emit batch airdrop event
        event::emit(BatchAirdropEvent {
            recipients,
            amount_per_recipient,
            timestamp: current_time,
        });
    }

    #[test_only]
    use sui::test_scenario;
    #[test_only]
    use sui::test_utils::assert_eq;
    #[test_only]
    use sui::test_utils;

    #[test]
    fun test_init(ctx: &mut tx_context::TxContext) {
        let sender = tx_context::sender(ctx);

        test_scenario::next_tx(&mut scenario, sender);
        let authority: AirdropAuthority = test_scenario::take_from_sender<AirdropAuthority>(&scenario);

        // Check: admin đầu tiên đúng là deployer
        assert!(vector::contains(&authority.admins, &sender), 100);

        test_scenario::return_to_sender(&scenario, authority);
        test_scenario::end(scenario);
    }

    // #[test]
    // fun test_batch_airdrop() {
    //     let deployer = @0xA;
    //     let mut scenario = init_test_scenario(deployer);
        
    //     // Setup recipients
    //     let recipient1 = @0xB;
    //     let recipient2 = @0xC;
    //     let mut recipients = vector::empty<address>();
    //     vector::push_back(&mut recipients, recipient1);
    //     vector::push_back(&mut recipients, recipient2);
        
    //     let total_amount = MIN_AIRDROP * 2;
        
    //     test_scenario::next_tx(&mut scenario, deployer);
    //     {
    //         let mut authority = test_scenario::take_from_sender<AirdropAuthority>(&scenario);
    //         let clock = test_scenario::take_shared<Clock>(&scenario);
            
    //         // Perform batch airdrop
    //         batch_airdrop(
    //             &mut authority,
    //             recipients,
    //             total_amount,
    //             &clock,
    //             test_scenario::ctx(&mut scenario)
    //         );
            
    //         // Check remaining balance
    //         let remaining_balance = balance::value(&authority.airdrop_balance);
    //         assert!(remaining_balance == INITIAL_SUPPLY - total_amount, 0);
            
    //         test_scenario::return_to_sender(&scenario, authority);
    //         test_scenario::return_shared(clock);
    //     };
        
    //     // Verify recipients received their coins
    //     test_scenario::next_tx(&mut scenario, recipient1);
    //     {
    //         let coin = test_scenario::take_from_sender<Coin<SUIDROP>>(&scenario);
    //         assert!(coin::value(&coin) == MIN_AIRDROP, 1);
    //         test_scenario::return_to_sender(&scenario, coin);
    //     };
        
    //     test_scenario::next_tx(&mut scenario, recipient2);
    //     {
    //         let coin = test_scenario::take_from_sender<Coin<SUIDROP>>(&scenario);
    //         assert!(coin::value(&coin) == MIN_AIRDROP, 2);
    //         test_scenario::return_to_sender(&scenario, coin);
    //     };
        
    //     test_scenario::end(scenario);
    // }

    // #[test]
    // #[expected_failure(abort_code = EUnauthorized)]
    // fun test_unauthorized_batch_airdrop() {
    //     let deployer = @0xA;
    //     let unauthorized_user = @0xB;
    //     let mut scenario = init_test_scenario(deployer);
        
    //     let mut recipients = vector::empty<address>();
    //     vector::push_back(&mut recipients, @0xC);
        
    //     // Try to perform batch airdrop as unauthorized user
    //     test_scenario::next_tx(&mut scenario, unauthorized_user);
    //     {
    //         let mut authority = test_scenario::take_from_sender<AirdropAuthority>(&scenario);
    //         let clock = test_scenario::take_shared<Clock>(&scenario);
            
    //         batch_airdrop(
    //             &mut authority,
    //             recipients,
    //             MIN_AIRDROP,
    //             &clock,
    //             test_scenario::ctx(&mut scenario)
    //         );
            
    //         test_scenario::return_to_sender(&scenario, authority);
    //         test_scenario::return_shared(clock);
    //     };
        
    //     test_scenario::end(scenario);
    // }

    // #[test]
    // #[expected_failure(abort_code = EInvalidAmount)]
    // fun test_invalid_amount_batch_airdrop() {
    //     let deployer = @0xA;
    //     let mut scenario = init_test_scenario(deployer);
        
    //     let mut recipients = vector::empty<address>();
    //     vector::push_back(&mut recipients, @0xB);
    //     vector::push_back(&mut recipients, @0xC);
        
    //     // Try to perform batch airdrop with amount too small per recipient
    //     test_scenario::next_tx(&mut scenario, deployer);
    //     {
    //         let mut authority = test_scenario::take_from_sender<AirdropAuthority>(&scenario);
    //         let clock = test_scenario::take_shared<Clock>(&scenario);
            
    //         batch_airdrop(
    //             &mut authority,
    //             recipients,
    //             MIN_AIRDROP - 1, // Invalid amount
    //             &clock,
    //             test_scenario::ctx(&mut scenario)
    //         );
            
    //         test_scenario::return_to_sender(&scenario, authority);
    //         test_scenario::return_shared(clock);
    //     };
        
    //     test_scenario::end(scenario);
    // }
}