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

## Run Instructions

### 1. Backend (FastAPI + SQLModel)

1. Create and activate virtual environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

2. Install Python dependencies

```bash
pip install --upgrade pip
pip install fastapi uvicorn sqlmodel mysql-connector-python pydantic-settings
```

3. Set DB settings in `backend/core/settings.py` (or `.env`):

```text
db_user=root
db_password=yourpass
db_host=127.0.0.1
db_port=3306
db_name=south_balance_aafes_mvp
```

4. Create MySQL schema and run migration

```bash
mysql -u root -p
CREATE DATABASE south_balance_aafes_mvp;
exit
PYTHONPATH="$PWD" python migrate_schema.py
```

5. Run API server

```bash
PYTHONPATH="$PWD" uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Check: `http://127.0.0.1:8000/docs`

### 2. Frontend (React)

Install and start

```bash
cd ui
npm install
npm start
```

Open: `http://localhost:3000`
