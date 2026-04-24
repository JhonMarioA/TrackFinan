# Entity-Relationship Model (TrackFinan)

This document describes the data model used by TrackFinan V1.

The primary goal of V1 is to provide a solid and consistent relational foundation for personal finance operations (accounts, transactions, categories, budgets, and reports).

## Version Scope

This is the first version of the model (V1).

V1 prioritizes:
- Data integrity.
- Clear relationships between financial entities.
- Deterministic balance behavior through database triggers.
- Simplicity for future extension.

Future versions are expected to extend this model with additional features while preserving compatibility where possible.

## Main Entities

1. `user`
2. `account`
3. `account_type`
4. `category`
5. `transaction_type`
6. `payment_method`
7. `transactions`
8. `budget`

## Core Relationships

- User 1:N Account
- User 1:N Category
- User 1:N Payment Method
- User 1:N Budget
- Account Type 1:N Account
- Transaction Type 1:N Category
- Account 1:N Transactions
- Category 1:N Transactions
- Payment Method 1:N Transactions
- Category 1:N Budget

## Logical Model (Tables and Fields)

### `user`
- `id` (PK)
- `name`
- `email` (UNIQUE)
- `password_hash`
- `created_at`

### `account_type`
- `id` (PK)
- `name` (UNIQUE)

### `transaction_type`
- `id` (PK)
- `name` (UNIQUE), expected values in V1 catalog: `income`, `expense`

### `category`
- `id` (PK)
- `user_id` (FK -> `user.id`, nullable in schema)
- `name`
- `transaction_type_id` (FK -> `transaction_type.id`)
- UNIQUE (`user_id`, `name`)

### `payment_method`
- `id` (PK)
- `user_id` (FK -> `user.id`)
- `name`
- UNIQUE (`user_id`, `name`)

### `account`
- `id` (PK)
- `user_id` (FK -> `user.id`)
- `type_id` (FK -> `account_type.id`)
- `name`
- `balance` (default `0`)
- `created_at`

### `transactions`
- `id` (PK)
- `account_id` (FK -> `account.id`)
- `category_id` (FK -> `category.id`)
- `payment_method_id` (FK -> `payment_method.id`)
- `amount` (CHECK `amount > 0`)
- `description`
- `created_at`

### `budget`
- `id` (PK)
- `user_id` (FK -> `user.id`)
- `category_id` (FK -> `category.id`)
- `amount` (CHECK `amount > 0`)
- `month` (CHECK `month BETWEEN 1 AND 12`)
- `year`
- `created_at`
- UNIQUE (`user_id`, `category_id`, `month`, `year`)

## Integrity and Business Rules in V1

- Primary keys and foreign keys enforce referential integrity.
- Unique constraints prevent duplicate names where required (for each user scope).
- Check constraints validate positive amounts and valid month range.
- Indexes are present in foreign key and filter-oriented columns for frequent queries.

## Balance Automation (Triggers)

In V1, account balances are updated at database level using triggers on `transactions`:

- `after_transaction_insert`
  - Adds amount for `income` categories.
  - Subtracts amount for `expense` categories.

- `after_transaction_delete`
  - Reverts the prior effect on balance.

- `after_transaction_update`
  - Reverts old transaction effect.
  - Applies new transaction effect.

This approach keeps balance calculation centralized and consistent independently of API client behavior.

## Catalog Seeds in V1

The SQL script initializes:

- `account_type`: `cash`, `bank`, `credit_card`
- `transaction_type`: `income`, `expense`

## Notes for Future Versions

Planned or likely improvements after V1:

- Better support for global and user-default categories.
- Extended reporting dimensions (period grouping, trend tables, projections).
- Optional account transfers with audit-safe rules.
- Stronger lifecycle and archival strategy for historical data.
- Additional constraints or event logging for financial traceability.

## Source of Truth

The schema implementation is defined in:

- `docs/Initial_Script_MySQL_TrackFinan.sql`

If this document and the SQL script differ, the SQL script is the source of truth for V1.