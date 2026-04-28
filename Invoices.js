import React, { useEffect, useState } from 'react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {

    async function loadInvoices() {
      try {
        const response = await fetch(
          'http://localhost:8000/invoices'
        );

        const data = await response.json();

        setInvoices(data || []);
      } catch(error){
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();

  },[]);

  return (
    <div className="page-container">
      <h1
        style={{
          marginBottom:'25px',
          color:'#2c3e50'
        }}
      >
        Invoices
      </h1>

      <div className="card">
        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Customer Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice)=>(
                  <tr key={invoice.invoice_id}>
                    <td>
                      {invoice.invoice_id}
                    </td>

                    <td>
                      {new Date(
                        invoice.invoice_date
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      $
                      {Number(
                        invoice.amount
                      ).toFixed(2)}
                    </td>

                    <td>
                      {invoice.customer_email}
                    </td>

                    <td>
                      <span className="badge">
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}