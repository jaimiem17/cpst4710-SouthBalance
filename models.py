from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlmodel import SQLModel, Field
from sqlalchemy import Column, String, Boolean, Integer, DECIMAL, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func


def uuid_str() -> str:
    return str(uuid4())


class UserAccount(SQLModel, table=True):
    __tablename__ = "user_account"

    account_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    username: str = Field(sa_column=Column(String(100), unique=True, nullable=False))
    password_hash: str = Field(sa_column=Column(String(255), nullable=False))
    role: str = Field(sa_column=Column(String(50), nullable=False))
    is_active: bool = Field(
        default=True,
        sa_column=Column(Boolean, nullable=False, server_default="1"),
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            TIMESTAMP,
            nullable=False,
            server_default=func.current_timestamp(),
        ),
    )


class AAFESDistributionCenter(SQLModel, table=True):
    __tablename__ = "aafes_distribution_center"

    dc_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    facility_name: str = Field(sa_column=Column(String(200), nullable=False))
    address1: str = Field(sa_column=Column(String(200), nullable=False))
    address2: Optional[str] = Field(
        default=None,
        sa_column=Column(String(200), nullable=True),
    )
    city: str = Field(sa_column=Column(String(100), nullable=False))
    state: str = Field(sa_column=Column(String(100), nullable=False))
    postal_code: str = Field(sa_column=Column(String(30), nullable=False))
    region: str = Field(sa_column=Column(String(100), nullable=False))


class ProductItem(SQLModel, table=True):
    __tablename__ = "product_item"

    product_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    product_name: str = Field(sa_column=Column(String(200), nullable=False))
    base_cost: float = Field(sa_column=Column(DECIMAL(10, 2), nullable=False))
    is_active: bool = Field(
        default=True,
        sa_column=Column(Boolean, nullable=False, server_default="1"),
    )


class ProductColor(SQLModel, table=True):
    __tablename__ = "product_color"

    color_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    color_name: str = Field(sa_column=Column(String(100), unique=True, nullable=False))


class CustomOption(SQLModel, table=True):
    __tablename__ = "custom_option"

    custom_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    custom_type: str = Field(sa_column=Column(String(50), nullable=False))
    branch_name: Optional[str] = Field(
        default=None,
        sa_column=Column(String(150), nullable=True),
    )
    added_charge: float = Field(
        default=0.0,
        sa_column=Column(DECIMAL(10, 2), nullable=False, server_default="0.00"),
    )


class InventoryStock(SQLModel, table=True):
    __tablename__ = "inventory_stock"

    stock_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    product_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("product_item.product_id"),
            nullable=False,
        )
    )
    color_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("product_color.color_id"),
            nullable=False,
        )
    )
    quantity_available: int = Field(
        default=0,
        sa_column=Column(Integer, nullable=False, server_default="0"),
    )
    last_updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            TIMESTAMP,
            nullable=False,
            server_default=func.current_timestamp(),
            onupdate=func.current_timestamp(),
        ),
    )


class OrderHeader(SQLModel, table=True):
    __tablename__ = "order_header"

    order_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    account_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("user_account.account_id"),
            nullable=False,
        )
    )
    dc_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("aafes_distribution_center.dc_id"),
            nullable=False,
        )
    )
    order_date: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            TIMESTAMP,
            nullable=False,
            server_default=func.current_timestamp(),
        ),
    )
    status: str = Field(sa_column=Column(String(50), nullable=False))
    contact_email: str = Field(sa_column=Column(String(200), nullable=False))
    total_cost: float = Field(
        default=0.0,
        sa_column=Column(DECIMAL(12, 2), nullable=False, server_default="0.00"),
    )


class OrderItem(SQLModel, table=True):
    __tablename__ = "order_item"

    detail_id: str = Field(
        default_factory=uuid_str,
        sa_column=Column(String(36), primary_key=True),
    )
    order_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("order_header.order_id"),
            nullable=False,
        )
    )
    stock_id: str = Field(
        sa_column=Column(
            String(36),
            ForeignKey("inventory_stock.stock_id"),
            nullable=False,
        )
    )
    custom_id: Optional[str] = Field(
        default=None,
        sa_column=Column(
            String(36),
            ForeignKey("custom_option.custom_id"),
            nullable=True,
        ),
    )
    quantity_ordered: int = Field(sa_column=Column(Integer, nullable=False))
    calculated_item_cost: float = Field(
        default=0.0,
        sa_column=Column(DECIMAL(12, 2), nullable=False, server_default="0.00"),
    )

class ActivityLog(SQLModel, table=True):
    log_id: str = Field(primary_key=True)
    username: str
    action: str
    created_at: datetime = Field(default_factory=datetime.utcnow)