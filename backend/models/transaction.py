from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models.transaction import Transaction

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Backend works"}

@router.post("/transactions")
def create_transaction(transaction: Transaction, session: Session = Depends(get_session)):
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction

@router.get("/transactions")
def get_transactions(session: Session = Depends(get_session)):
    return session.exec(select(Transaction)).all()

@router.get("/balance")
def get_balance(session: Session = Depends(get_session)):
    transactions = session.exec(select(Transaction)).all()
    balance = 0

    for t in transactions:
        if t.type == "income":
            balance += t.amount
        else:
            balance -= t.amount

    return {"balance": balance}
