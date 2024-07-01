import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const endpoint = import.meta.env.VITE_API_URL;

  const handleAddClick = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    axios.post(`${endpoint}/expenses`, { name, category, date, amount })
      .then(response => {
        console.log(response.data);
        setExpenses([...expenses, response.data]);
      })
      .catch(error => {
        console.error(error);
      });

    e.target.reset();
  };

  const handleDeleteClick = (id) => {
    axios.delete(`${endpoint}/expenses/${id}`)
      .then(response => {
        console.log(response.data);
        setExpenses(expenses.filter(expense => expense._id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditClick = (e, id) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    axios.put(`${endpoint}/expenses/${id}`, { name, category, date, amount })
      .then(response => {
        console.log(response.data);
        setExpenses(expenses.map(expense => (expense._id === id ? response.data : expense)));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    setSelectedCategory("");
    setSelectedMonth("");
    setSelectedYear("");
  };

  const handleCategoryFilterChange = (value) => {
    setSelectedCategory(value);
    axios.get(`${endpoint}/expenses/category/${value}`)
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleMonthYearFilterChange = () => {
    axios.get(`${endpoint}/expenses/${selectedMonth}/${selectedYear}`)
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {

    if (filterType != "category" && filterType != "monthyear" ) {
      axios.get(`${endpoint}/expenses`)
        .then(response => {
          console.log(response.data);
          setExpenses(response.data);
          const uniqueCategories = [...new Set(response.data.map(expense => expense.category))];
          setCategories(uniqueCategories);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [filterType]);

  return (
    <div className="App p-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col justify-center items-center w-full" onSubmit={handleAddClick}>
            <div className="flex flex-row w-full">
              <div className="flex-1 p-2">
                <label htmlFor="name">Name:</label>
                <Input type="text" id="name" name="name" />
              </div>
              <div className="flex-1 p-2">
                <label htmlFor="category">Category:</label>
                <Input type="text" id="category" name="category" />
              </div>
            </div>

            <div className="flex flex-row w-full justify-evenly items-end">
              <div className="flex-1 p-2">
                <label htmlFor="date">Date:</label>
                <Input type="date" id="date" name="date" />
              </div>
              <div className="flex-1 p-2">
                <label htmlFor="amount">Amount:</label>
                <Input type="number" id="amount" name="amount" />
              </div>
              <div className="p-2 flex-2 align-bottom">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-7">

        <CardHeader >
          <CardTitle>Filter Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Select className="w-1/4" onValueChange={handleFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No filter</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="monthyear">Month & Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filterType === "category" && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <label htmlFor="categoryFilter">Category:</label>
              <Select className="w-1/4" onValueChange={handleCategoryFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filterType === "monthyear" && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <label htmlFor="monthFilter">Month:</label>
              <Select className="w-1/4" onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label htmlFor="yearFilter">Year:</label>
              <Input type="number" id="yearFilter" onChange={e => setSelectedYear(e.target.value)} className="w-1/4" />
              <Button onClick={handleMonthYearFilterChange} className="w-1/4">Apply</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle >Expense Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table >
            <TableCaption>The list of expenses</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Delete</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>
                    <Button onClick={() => handleDeleteClick(expense._id)}>Delete</Button>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger><Button>Edit</Button></PopoverTrigger>
                      <PopoverContent>
                        <form onSubmit={(e) => handleEditClick(e, expense._id)}>
                          <label htmlFor="name">Name:</label>
                          <Input type="text" id="name" name="name" defaultValue={expense.name} required />
                          <label htmlFor="category">Category:</label>
                          <Input type="text" id="category" name="category" defaultValue={expense.category} required />
                          <label htmlFor="date">Date:</label>
                          <Input type="date" id="date" name="date" defaultValue={expense.date} required />
                          <label htmlFor="amount">Amount:</label>
                          <Input type="number" id="amount" name="amount" defaultValue={expense.amount} required />
                          <Button type="submit">Save</Button>
                        </form>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
