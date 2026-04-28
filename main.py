from __future__ import annotations

from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import get_session, init_db
from models import (
    UserAccount,
    AAFESDistributionCenter,
    ProductItem,
    ProductColor,
    CustomOption,
    InventoryStock,
    OrderHeader,
    OrderItem,
    ActivityLog,
)
from schemas import (
    UserCreate,
    UserLogin,
    DistributionCenterCreate,
    ProductCreate,
    ProductColorCreate,
    CustomOptionCreate,
    InventoryStockCreate,
    InventoryAdjust,
    OrderCreate,
    OrderStatusUpdate,
    OrderItemCreate,
    FullOrderCreate,
)


app = FastAPI(
    title="South Balance AAFES MVP API",
    description="Starter FastAPI backend for South Balance order and inventory management",
    version="1.0.0",
)

def create_log(session, username, action):
    log = ActivityLog(
        log_id=str(uuid4()),
        username=username,
        action=action
    )
    session.add(log)
    session.commit()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/")
def root():
    return {
        "message": "South Balance API is running",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# ---------- Users ----------

@app.post("/login", response_model=dict)
def login_user(login_data: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(
        select(UserAccount).where(UserAccount.username == login_data.username)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is inactive")

    if user.password_hash != login_data.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {
        "message": "Login successful",
        "user": {
            "account_id": user.account_id,
            "username": user.username,
            "role": user.role,
            "is_active": user.is_active,
        },
    }


@app.post("/users", response_model=dict)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    existing = session.exec(
        select(UserAccount).where(UserAccount.username == user.username)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    db_user = UserAccount(
        account_id=str(uuid4()),
        username=user.username,
        password_hash=user.password_hash,
        role=user.role,
        is_active=True,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return {"message": "User created", "account_id": db_user.account_id}


@app.get("/users")
def get_users(session: Session = Depends(get_session)):
    return session.exec(select(UserAccount)).all()


# ---------- Distribution Centers ----------

@app.post("/distribution-centers", response_model=dict)
def create_distribution_center(
    dc: DistributionCenterCreate, session: Session = Depends(get_session)
):
    db_dc = AAFESDistributionCenter(
        dc_id=str(uuid4()),
        facility_name=dc.facility_name,
        address1=dc.address1,
        address2=dc.address2,
        city=dc.city,
        state=dc.state,
        postal_code=dc.postal_code,
        region=dc.region,
    )
    session.add(db_dc)
    session.commit()
    session.refresh(db_dc)

    return {"message": "Distribution center created", "dc_id": db_dc.dc_id}


@app.get("/distribution-centers")
def get_distribution_centers(session: Session = Depends(get_session)):
    return session.exec(select(AAFESDistributionCenter)).all()


# ---------- Products ----------

@app.post("/products", response_model=dict)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    db_product = ProductItem(
        product_id=str(uuid4()),
        product_name=product.product_name,
        base_cost=product.base_cost,
        is_active=product.is_active,
    )
    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return {"message": "Product created", "product_id": db_product.product_id}


@app.get("/products")
def get_products(session: Session = Depends(get_session)):
    return session.exec(select(ProductItem)).all()


# ---------- Colors ----------

@app.post("/colors", response_model=dict)
def create_color(color: ProductColorCreate, session: Session = Depends(get_session)):
    existing = session.exec(
        select(ProductColor).where(ProductColor.color_name == color.color_name)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Color already exists")

    db_color = ProductColor(
        color_id=str(uuid4()),
        color_name=color.color_name,
    )
    session.add(db_color)
    session.commit()
    session.refresh(db_color)

    return {"message": "Color created", "color_id": db_color.color_id}


@app.get("/colors")
def get_colors(session: Session = Depends(get_session)):
    return session.exec(select(ProductColor)).all()


# ---------- Custom Options ----------

@app.post("/custom-options", response_model=dict)
def create_custom_option(
    custom_option: CustomOptionCreate, session: Session = Depends(get_session)
):
    db_custom = CustomOption(
        custom_id=str(uuid4()),
        custom_type=custom_option.custom_type,
        branch_name=custom_option.branch_name,
        added_charge=custom_option.added_charge,
    )
    session.add(db_custom)
    session.commit()
    session.refresh(db_custom)

    return {"message": "Custom option created", "custom_id": db_custom.custom_id}


@app.get("/custom-options")
def get_custom_options(session: Session = Depends(get_session)):
    return session.exec(select(CustomOption)).all()


# ---------- Inventory ----------

@app.post("/inventory", response_model=dict)
def create_inventory_stock(
    stock: InventoryStockCreate, session: Session = Depends(get_session)
):
    product = session.get(ProductItem, stock.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    color = session.get(ProductColor, stock.color_id)
    if not color:
        raise HTTPException(status_code=404, detail="Color not found")

    db_stock = InventoryStock(
        stock_id=str(uuid4()),
        product_id=stock.product_id,
        color_id=stock.color_id,
        quantity_available=stock.quantity_available,
    )
    session.add(db_stock)
    session.commit()
    session.refresh(db_stock)

    return {"message": "Inventory row created", "stock_id": db_stock.stock_id}


@app.get("/inventory")
def get_inventory(session: Session = Depends(get_session)):
    return session.exec(select(InventoryStock)).all()


@app.get("/order-form-data")
def get_order_form_data(session: Session = Depends(get_session)):
    inventory_rows = session.exec(select(InventoryStock)).all()
    distribution_centers = session.exec(select(AAFESDistributionCenter)).all()
    custom_options = session.exec(select(CustomOption)).all()

    inventory = []

    for stock in inventory_rows:
        product = session.get(ProductItem, stock.product_id)
        color = session.get(ProductColor, stock.color_id)

        if product and color and product.is_active:
            inventory.append(
                {
                    "stock_id": stock.stock_id,
                    "product_id": product.product_id,
                    "product_name": product.product_name,
                    "color_id": color.color_id,
                    "color_name": color.color_name,
                    "base_cost": float(product.base_cost),
                    "quantity_available": stock.quantity_available,
                }
            )

    return {
        "inventory": inventory,
        "distribution_centers": distribution_centers,
        "custom_options": custom_options,
    }


@app.patch("/inventory/{stock_id}/adjust", response_model=dict)
def adjust_inventory(
    stock_id: str,
    adjustment: InventoryAdjust,
    session: Session = Depends(get_session),
):
    stock = session.get(InventoryStock, stock_id)
    if not stock:
        raise HTTPException(status_code=404, detail="Inventory stock not found")

    new_qty = stock.quantity_available + adjustment.quantity_change
    if new_qty < 0:
        raise HTTPException(status_code=400, detail="Inventory cannot go negative")

    stock.quantity_available = new_qty
    session.add(stock)
    session.commit()
    session.refresh(stock)

    create_log(
    session,
    "Inventory",
    f"Adjusted stock {stock.stock_id} by {adjustment.quantity_change}"
)

    return {
        "message": "Inventory updated",
        "stock_id": stock.stock_id,
        "quantity_available": stock.quantity_available,
    }


# ---------- Orders ----------

@app.post("/orders", response_model=dict)
def create_order(order: OrderCreate, session: Session = Depends(get_session)):
    user = session.get(UserAccount, order.account_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    dc = session.get(AAFESDistributionCenter, order.dc_id)
    if not dc:
        raise HTTPException(status_code=404, detail="Distribution center not found")

    db_order = OrderHeader(
        order_id=str(uuid4()),
        account_id=order.account_id,
        dc_id=order.dc_id,
        contact_email=order.contact_email,
        status=order.status,
        total_cost=0.0,
    )
    session.add(db_order)
    session.commit()
    session.refresh(db_order)

    return {"message": "Order created", "order_id": db_order.order_id}


@app.post("/orders/full", response_model=dict)
def create_full_order(order: FullOrderCreate, session: Session = Depends(get_session)):
    user = session.get(UserAccount, order.account_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    dc = session.get(AAFESDistributionCenter, order.dc_id)
    if not dc:
        raise HTTPException(status_code=404, detail="Distribution center not found")

    if not order.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    db_order = OrderHeader(
        order_id=str(uuid4()),
        account_id=order.account_id,
        dc_id=order.dc_id,
        contact_email=order.contact_email,
        status="Pending",
        total_cost=0.0,
    )

    session.add(db_order)

    total_cost = 0.0

    for item in order.items:
        if item.quantity_ordered <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

        stock = session.get(InventoryStock, item.stock_id)
        if not stock:
            raise HTTPException(status_code=404, detail="Inventory stock not found")

        product = session.get(ProductItem, stock.product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        added_charge = 0.0

        if item.custom_id:
            custom = session.get(CustomOption, item.custom_id)
            if not custom:
                raise HTTPException(status_code=404, detail="Custom option not found")
            added_charge = float(custom.added_charge)

        if stock.quantity_available < item.quantity_ordered:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient inventory for {product.product_name}",
            )

        item_cost = (float(product.base_cost) + added_charge) * item.quantity_ordered
        total_cost += item_cost

        stock.quantity_available -= item.quantity_ordered

        db_item = OrderItem(
            detail_id=str(uuid4()),
            order_id=db_order.order_id,
            stock_id=item.stock_id,
            custom_id=item.custom_id,
            quantity_ordered=item.quantity_ordered,
            calculated_item_cost=item_cost,
        )

        session.add(stock)
        session.add(db_item)

    db_order.total_cost = total_cost
    session.add(db_order)
    session.commit()
    session.refresh(db_order)

    create_log(
    session,
    user.username,
    f"Placed order {db_order.order_id}")

    return {
        "message": "Order created successfully",
        "order_id": db_order.order_id,
        "total_cost": float(db_order.total_cost),
    }


@app.get("/orders")
def get_orders(session: Session = Depends(get_session)):
    return session.exec(select(OrderHeader)).all()


@app.get("/orders-summary")
def get_orders_summary(session: Session = Depends(get_session)):
    orders = session.exec(select(OrderHeader)).all()
    results = []

    for order in orders:
        user = session.get(UserAccount, order.account_id)
        dc = session.get(AAFESDistributionCenter, order.dc_id)

        items = session.exec(
            select(OrderItem).where(OrderItem.order_id == order.order_id)
        ).all()

        total_quantity = sum(item.quantity_ordered for item in items)

        results.append(
            {
                "order_id": order.order_id,
                "order_date": order.order_date,
                "username": user.username if user else "Unknown",
                "distribution_center": dc.facility_name if dc else "Unknown",
                "quantity": total_quantity,
                "status": order.status,
                "contact_email": order.contact_email,
                "total_cost": float(order.total_cost),
            }
        )

    return results

@app.get("/notifications")
def get_notifications(session: Session = Depends(get_session)):

    inventory_rows = session.exec(
        select(InventoryStock)
    ).all()

    notifications = []

    for stock in inventory_rows:
        product = session.get(
            ProductItem,
            stock.product_id
        )

        if not product:
            continue

        if stock.quantity_available == 0:
            notifications.append({
                "type":"critical",
                "message":
                f"{product.product_name} is out of stock"
            })

        elif stock.quantity_available <= 5:
            notifications.append({
                "type":"warning",
                "message":
                f"{product.product_name} is low stock ({stock.quantity_available} remaining)"
            })

    return notifications

@app.get("/invoices")
def get_invoices(session: Session = Depends(get_session)):
    orders = session.exec(
        select(OrderHeader)
    ).all()

    invoices = []

    for order in orders:
        invoices.append(
            {
                "invoice_id": order.order_id,
                "invoice_date": order.order_date,
                "customer_email": order.contact_email,
                "amount": float(order.total_cost),
                "status": order.status
            }
        )

    return invoices

@app.get("/orders/{order_id}")
def get_order(order_id: str, session: Session = Depends(get_session)):
    order = session.get(OrderHeader, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = session.exec(
        select(OrderItem).where(OrderItem.order_id == order_id)
    ).all()

    return {"order": order, "items": items}


@app.patch("/orders/{order_id}/status", response_model=dict)
def update_order_status(
    order_id: str,
    payload: OrderStatusUpdate,
    session: Session = Depends(get_session),
):
    order = session.get(OrderHeader, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = payload.status
    session.add(order)
    session.commit()
    session.refresh(order)

    return {
        "message": "Order status updated",
        "order_id": order.order_id,
        "status": order.status,
    }


# ---------- Order Items ----------

@app.post("/order-items", response_model=dict)
def create_order_item(item: OrderItemCreate, session: Session = Depends(get_session)):
    order = session.get(OrderHeader, item.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    stock = session.get(InventoryStock, item.stock_id)
    if not stock:
        raise HTTPException(status_code=404, detail="Inventory stock not found")

    if item.quantity_ordered <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    if stock.quantity_available < item.quantity_ordered:
        raise HTTPException(status_code=400, detail="Insufficient inventory")

    if item.custom_id:
        custom = session.get(CustomOption, item.custom_id)
        if not custom:
            raise HTTPException(status_code=404, detail="Custom option not found")

    stock.quantity_available -= item.quantity_ordered

    db_item = OrderItem(
        detail_id=str(uuid4()),
        order_id=item.order_id,
        stock_id=item.stock_id,
        custom_id=item.custom_id,
        quantity_ordered=item.quantity_ordered,
        calculated_item_cost=item.calculated_item_cost,
    )

    order.total_cost += item.calculated_item_cost

    session.add(stock)
    session.add(db_item)
    session.add(order)
    session.commit()
    session.refresh(db_item)

    return {"message": "Order item created", "detail_id": db_item.detail_id}

@app.get("/logs")
def get_logs(session: Session = Depends(get_session)):
    logs = session.exec(
        select(ActivityLog)
    ).all()

    return logs