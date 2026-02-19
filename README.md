# cpst4710-SouthBalance

# South Balance AAFES MVP – Database Design (AppDev)

This repository contains the database implementation for the South Balance AAFES Order Management MVP.

The database was designed based on the project ERD and user flow diagram and implemented using MySQL with SQLModel as the ORM layer.

---

## Database Information

**Database Name:**  
`south_balance_aafes_mvp`

**Platform:**  
MySQL (via mysql+mysqlconnector)

**ORM:**  
SQLModel (FastAPI-compatible)

---

## Technology Decision

The AppDev team selected SQLModel because of prior experience using it in a similar full-stack application. Leveraging an already familiar framework allowed us to efficiently translate the ERD into relational tables while maintaining strong type safety, foreign key integrity, and clean schema definitions.

---

## Repository Structure

database.py # MySQL engine configuration and session management

models.py # SQLModel schema definitions (tables and relationships)

migrate_schema.py # Controlled schema rebuild script

stored_procs.sql # Starter stored procedures (basic CRUD operations)

---

## Tables Implemented

- user_account
- aafes_distribution_center
- product_item
- product_color
- inventory_stock
- custom_option
- order_header
- order_item

Foreign key relationships enforce referential integrity between orders, users, distribution centers, inventory, and customization options.

---

## Stored Procedures

The `stored_procs.sql` file contains starter procedures for:

- Creating users
- Creating products
- Creating orders
- Updating order status
- Adjusting inventory
- Retrieving order data

These procedures demonstrate initial CRUD capability and will be expanded in the next module.

---

## Running the Migration

To rebuild the schema during development:

```bash
python migrate_schema.py
```
