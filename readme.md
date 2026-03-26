# Personal Finance and Expenses System

A database-driven personal finance tracking system focused on data integrity, relational design, and financial analytics.

## 1. General Project Approach

System Type:
Data-centric Information System

Main Objective:
To design and implement a relational database that allows for the recording, organization, and analysis of personal financial transactions, ensuring data integrity, consistency, and scalability.

## 2. System Requirements
### 2.1 Functional Requirements

The system must allow users to:


    Register users in the system.

    Create and manage multiple financial accounts per user.

    Record income and expense transactions.

    Classify transactions by category.

    Associate transactions with accounts and payment methods.

    View transaction history.

    Calculate account balances.

    Generate monthly income and expense reports.

    View expenses grouped by category.

    Maintain the integrity of financial data.


### 2.2 Non-functional Requirements

    Data Integrity:
    The system must guarantee consistency through primary keys, foreign keys, and constraints.

    Scalability:
    The database must support the growth in transaction volume without performance degradation.

    Security:
    Passwords must be stored securely (hashed).

    Performance: Frequent queries must be optimized using indexes.

    Maintainability:
    The design must be standardized and allow for future extensions.

    Usability:
    The interface must be simple and understandable.


## 3. System Modeling
### 3.1 Conceptual Model (ER)

Main Entities:

    User

    Account

    Transaction

    Category

    Payment Method

Relationships:

    User has Accounts (1:N)

    User performs Transactions (1:N)

    Account records Transactions (1:N)

    Category classifies Transactions (1:N)

    Payment Method is used in Transactions (1:N)

### 3.2 Logical (Relational) Model

Main Tables:

    users

    accounts

    categories

    payment_methods

    transactions

## 4. Design Pattern 

### Layered Architecture

```sql
Presentation (HTML / CSS / JS)
        ↓
Application Logic 
        ↓
Persistence Layer (MySQL)

```

## 5. Main Use Cases

    1) Register user

    2) Create financial account

    3) Register income

    4) Register expenses

    5) View balance

    6) Generate monthly report

    7) View expenses by category