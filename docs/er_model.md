# Entity-Relationship (ER) Model

The ER model for the personal financial management application includes the following entities and relationships:

**Main Entities**:

1) User
2) Account
3) Transaction
4) Category
5) Payment Method
6) Account Type
7) Transaction Type
8) Budget (monthly limit per category)

**Relationships**:

Key Relationships:

* User 1:N Account
* User 1:N Category
* User 1:N Payment Method
* Account 1:N Transaction
* Category 1:N Transaction
* Payment Method 1:N Transaction
* Account Type 1:N Account
* Transaction Type 1:N Transaction
* User 1:N Budget
* Category 1:N Budget


Usuario
TipoCuenta
TipoTransacción
Categoría
MétodoPago
Cuenta
Transacción
Presupuesto

**Structure**:

* user:

        * id (PK)
        * name
        * email (UNIQUE)
        * password_hash
        * created_at

* account_type:

        * id (PK)
        * name (UNIQUE)

* account:

        * id (PK)
        * user_id (FK → user.id)
        * type_id (FK → account_type.id)
        * name
        * balance
        * created_at

* transaction_type:

        * id (PK)
        * name (UNIQUE) (ej: income, expense)   

* payment_method:

        * id (PK)
        * user_id (FK → user.id)
        * name 

        UNIQUE (user_id, name)


* category:

        * id (PK)
        * user_id (FK → user.id) (NULLABLE)
        * name 
        * transaction_type_id (FK → transaction_type.id)

        UNIQUE (user_id, name)

* budget:

        * id (PK)
        * user_id (FK → user.id)
        * category_id (FK → category.id)
        * amount
        * month
        * year
        * created_at

        UNIQUE (user_id, category_id, month, year)

* transaction:

        * id (PK)
        * account_id (FK → account.id)
        * category_id (FK → category.id)
        * payment_method_id (FK → payment_method.id)
        * amount
        * description
        * created_at

