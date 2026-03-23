# Modelo Entidad Relación (ER)

El modelo ER para la aplicación de gestión financiera personal incluye las siguientes entidades y relaciones:

**Entidades Principales**:

1) Usuario 
2) Cuenta 
3) Transacción 
4) Categoría 
5) Método de Pago 
6) Tipo de Cuenta 
7) Tipo de Transacción 
8) Presupuesto (límite mensual por categoría)

**Relaciones**:

Relaciones clave:

* Usuario 1:N Cuenta
* Usuario 1:N Categoría
* Usuario 1:N MétodoPago
* Cuenta 1:N Transacción
* Categoría 1:N Transacción
* MétodoPago 1:N Transacción
* TipoCuenta 1:N Cuenta
* TipoTransacción 1:N Transacción
* Usuario 1:N Presupuesto
* Categoría 1:N Presupuesto

**Estructura detallada**:

* **Usuario**:

        id (PK)
        name
        email (UNIQUE)
        password_hash
        created_at 

* **Cuenta**:

        id (PK)
        user_id (FK → Usuario.id)
        tipo_cuenta_id (FK → TipoCuenta.id)
        name
        balance
        created_at

* **TipoCuenta (catálogo)**: 

        id (PK)
        name  // ahorro, corriente, efectivo, etc.

* **Transacción (nucleo)**:

        id (PK)
        account_id (FK → Cuenta.id)
        category_id (FK → Categoría.id)
        payment_method_id (FK → MétodoPago.id)
        tipo_transaccion_id (FK → TipoTransacción.id)

        amount
        description
        created_at

* **TipoTransacción (catálogo)**:

        id (PK)
        name  // income, expense

* **Categoría**:

        id (PK)
        user_id (FK → Usuario.id)  // null si es global
        name
        tipo_transaccion_id (FK → TipoTransacción.id)

* **Método de Pago**:

        id (PK)
        user_id (FK → Usuario.id)
        name

* **Presupuesto**:

        id (PK)
        user_id (FK → Usuario.id)
        category_id (FK → Categoría.id)

        amount_limit
        month   // 1-12
        year

        created_at