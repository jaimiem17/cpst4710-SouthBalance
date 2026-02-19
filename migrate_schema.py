#!/usr/bin/env python3
"""
South Balance Schema Migration Script
Drops and recreates all tables using SQLModel (MySQL)
"""

import sys
from sqlmodel import Session, text, SQLModel
from database import engine

# IMPORTANT: import all models so SQLModel.metadata knows about them
import models  # noqa: F401


def migrate_database() -> bool:
    try:
        print("\nStarting database migration...")

        # Disable FK checks
        print("Disabling foreign key checks...")
        with Session(engine) as session:
            session.execute(text("SET FOREIGN_KEY_CHECKS = 0"))
            session.commit()

        print("Dropping all tables...")
        SQLModel.metadata.drop_all(engine)

        print("Creating all tables...")
        SQLModel.metadata.create_all(engine)

        print("Re-enabling foreign key checks...")
        with Session(engine) as session:
            session.execute(text("SET FOREIGN_KEY_CHECKS = 1"))
            session.commit()

        print("Migration completed successfully!")
        return True

    except Exception as e:
        try:
            with Session(engine) as session:
                session.execute(text("SET FOREIGN_KEY_CHECKS = 1"))
                session.commit()
        except:
            pass
        print(f"Migration failed: {e}")
        return False


def main():
    print("=" * 60)
    print("SOUTH BALANCE AAFES MVP - SCHEMA MIGRATION")
    print("=" * 60)
    confirmation = input("Proceed? This will DELETE ALL EXISTING DATA! (yes/no): ")
    if confirmation.lower() != "yes":
        print("Cancelled.")
        sys.exit(0)

    if not migrate_database():
        sys.exit(1)


if __name__ == "__main__":
    main()
