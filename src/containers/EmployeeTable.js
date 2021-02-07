import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment'

const employeeUrl = 'https://randomuser.me/api/?results=100';
const styles = {
	tbody: {
		overflowY: 'auto'
	},
	table: {
		height: '100%'
	}
};

function EmployeeTable(props) {
	const [data, setData] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [filter, setFilter] = useState(false);
	const [sort, setSort] = useState( {col: 'fullName', order: 1});
	const searchInput = useRef('');

	useEffect( () => {
		queryEmployees();
	}, []);

	const queryEmployees = async () => {
		let res = await fetch(employeeUrl);
		let employees = await res.json();
		let list = employees.results.map(employee => (
			{
				id: employee.id.value ? employee.id.value : employee.birthday + employee.gender + employee.name.first + employee.name.last,
				profilePic: employee.picture.thumbnail,
				birthday: employee.dob.date,
				gender: employee.gender,
				name: `${employee.name.first} ${employee.name.last}`,
				email: employee.email,
				phone: employee.phone	
			})
		);
		setData(list);
	};

	//Sort the employees by the column clicked
	const sortEmployees = (event, field) => {
		//Default the sort to sort by ascending
		//Check if the column we clicked is already the sort, if it is just reeverse it.
		if(sort.col === field) {
			if(!filter)
				setData( sortArray(data, field, sort.order * -1) )
			else
				setFiltered( sortArray(filtered, field, sort.order * -1) )

			setSort( {col: field, order: sort.order * -1} )
		}
		else {
			if(!filter)
				setData( sortArray(data, field, 1) )
			else
				setFiltered( sortArray(filtered, field, 1) )
			setSort( {col: field, order: 1} )
		}
	};

	const sortArray = (arr, field, order) => {
		let copy = [...arr];
		if(order === 1)
			copy.sort( (a, b) => {
				if(a[field] > b[field])
					return 1;
				else if(b[field]> a[field])
					return -1
				else
					return 0;
			});
		else
			copy.sort( (a, b) => {
				if(a[field] > b[field])
					return -1;
				else if(b[field]> a[field])
					return 1
				else
					return 0;
			});
		return copy;
	}
	
	const searchEmployees = () => {
		let copy = [...data];
		let search = searchInput.current.value;
		if(search.length > 0)
		{
			setFiltered(copy.filter(emp => emp.name.toLowerCase().includes(search) || emp.birthday.includes(search) || emp.gender.toLowerCase().includes(search)));
			setFilter(true);
		}
		else
		{
			setFiltered([]);
			setFilter(false);
		}
	};

	const handleInputChange = (event) => {
		searchEmployees();
	};

	return (
		<>
			<div className="form-group">
				<label>Search:</label>
				<input type="text" className="form-control" id="usr" onChange={handleInputChange} ref={searchInput}/>
			</div>
			<table className='table' style={styles.table}>
				<thead>
					<tr>
						<th>Profile</th>
						<th onClick={e => sortEmployees(e, 'name')}>Name</th>
						<th onClick={e => sortEmployees(e, 'phone')}>Phone</th>
						<th onClick={e => sortEmployees(e, 'email')}>Email</th>
						<th onClick={e => sortEmployees(e, 'birthday')}>Birthday</th>
						<th onClick={e => sortEmployees(e, 'gender')}>Gender</th>
					</tr>
				</thead>
				<tbody style={styles.tbody}>
					{
						!filter ? 
							data.map(row => {
								return (
									<tr key={row.id}>
										<td><img src={row.profilePic} /></td>
										<td>{row.name}</td>
										<td>{row.phone}</td>
										<td>{row.email}</td>
										<td>{moment(row.birthday).format("MM/DD/YYYY")}</td>
										<td>{row.gender}</td>
									</tr>
								);
						}) 
						:
							filtered.map(row => {
								return (
									<tr key={row.id}>
										<td><img src={row.profilePic} /></td>
										<td>{row.name}</td>
										<td>{row.phone}</td>
										<td>{row.email}</td>
										<td>{moment(row.birthday).format("MM/DD/YYYY")}</td>
										<td>{row.gender}</td>
									</tr>
								);
							})
					}
				</tbody>
			</table>
		</>
	)
}

export default EmployeeTable;