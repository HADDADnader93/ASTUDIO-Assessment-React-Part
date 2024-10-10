import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [birthdayFilter, setBirthdayFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    document.title = "Users Page"; 
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const params = {
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        ...(nameFilter && { name: nameFilter }),
        ...(emailFilter && { email: emailFilter }),
        ...(genderFilter && { gender: genderFilter }), 
        ...(birthdayFilter && { birthday: formatBirthday(birthdayFilter) }),
      };      

      const res = await axios.get(`https://dummyjson.com/users`, { params });

      setUsers(res.data.users);
      setTotalUsers(res.data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [pageSize, currentPage, nameFilter, emailFilter, genderFilter, birthdayFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function formatBirthday(birthday) {
    const [year, month, day] = birthday.split('-');
    const formattedMonth = Number(month);
    const formattedDay = Number(day);
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const displayedUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.gender?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = genderFilter ? user.gender?.toLowerCase() === genderFilter.toLowerCase() : true;
    const matchesEmail = user.email?.toLowerCase().includes(emailFilter.toLowerCase());
    const matchesName = user.firstName?.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesFilter = birthdayFilter ? user.birthDate?.toLowerCase() === formatBirthday(birthdayFilter).toLowerCase() : true;

    return matchesFilter && matchesEmail && matchesName && matchesSearch && matchesGender;
  });

  const userColumns = [
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Maiden Name', accessor: 'maidenName' },
    { header: 'Age', accessor: 'age' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Email', accessor: 'email' },
    { header: 'Username', accessor: 'username' },
    { header: 'Blood Group', accessor: 'bloodGroup' },
    { header: 'Eye Color', accessor: 'eyeColor' },
  ];

  return (
    <div>
      <Filter
        onPageSizeChange={setPageSize}
        onNameFilterChange={setNameFilter}
        onEmailFilterChange={setEmailFilter}
        onBirthdayFilterChange={setBirthdayFilter}
        onGenderFilterChange={setGenderFilter}
        currentName={nameFilter}
        currentEmail={emailFilter}
        currentBirthday={birthdayFilter}
        currentGender={genderFilter}
        currentPageSize={pageSize}
        onSearchChange={setSearchTerm}
        showTabs={false}
        isUserFilter={true}
      />
      <Table
        data={displayedUsers}
        columns={userColumns}
      />
      <Pagination 
        currentPage={currentPage} 
        totalItems={totalUsers} 
        pageSize={pageSize}
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default Users;
