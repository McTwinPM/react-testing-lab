import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")
  const [sortBy, setSortBy] = useState("description");

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }
  
  // Sort function here
  function onSort(sortBy){
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortBy === "description") {
        return a.description.localeCompare(b.description);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      } else {
        return 0; // No sorting
      }
    });
    setTransactions(sortedTransactions);
    
  }

  // Filter using search here and pass new variable down

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
