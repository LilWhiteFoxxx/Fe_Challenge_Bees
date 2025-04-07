import React, { useMemo, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    TablePagination,
    TextField,
    TableSortLabel,
    Tooltip,
    IconButton,
} from '@mui/material';
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import { formatBalance, formatDateOnly, formatFullDateTime } from './utils';
import userData from './apis/users.json';
import ThemeToggle from './components/ThemeToggle';

import './App.css';

interface UserData {
    id: number;
    name: string | null;
    balance: number;
    email: string | null;
    registerAt: string | null;
    active: boolean;
}

interface ColumnDefinition {
    title: string;
    field: keyof Omit<UserData, 'id' | 'active'> | 'status' | 'actions';
    sortable?: boolean;
}

const typedUserData: UserData[] = userData;

const App: React.FC = () => {
    const columns: ColumnDefinition[] = [
        { title: 'Name', field: 'name', sortable: true },
        { title: 'Balance ($)', field: 'balance', sortable: true },
        { title: 'Email', field: 'email' },
        { title: 'Registration Date', field: 'registerAt', sortable: true },
        { title: 'STATUS', field: 'status' },
        { title: 'ACTIONS', field: 'actions' },
    ];

    // UseState
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [nameFilter, setNameFilter] = useState('');
    const [nameFilterVisible, setNameFilterVisible] = useState(false);
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Event Change Page
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Event Sort
    const handleSort = (field: string) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    // Event Edit
    const handleEdit = (user: UserData) => {
        console.log('Edit user:', user);
    };

    // Event Delete
    const handleDelete = (user: UserData) => {
        console.log('Delete user:', user);
    };

    // Event Filtering
    const filteredData = useMemo(() => {
        return typedUserData.filter((user) => {
            const nameMatch =
                user.name?.toLowerCase().includes(nameFilter.toLowerCase()) ??
                false;
            return nameMatch;
        });
    }, [nameFilter]);

    // Event Sorting
    const sortedData = useMemo(() => {
        if (!sortField) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = (a as any)[sortField];
            const bVal = (b as any)[sortField];

            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return sortDirection === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [filteredData, sortField, sortDirection]);

    // PageinatedData handle
    const paginatedData = useMemo(() => {
        return sortedData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [sortedData, page, rowsPerPage]);

    // Select
    const isSelected = (id: number) => selectedRows.includes(id);

    const handleSelectRow = (id: number) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((rowId) => rowId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allRowIds = paginatedData.map((row) => row.id);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    const isAllSelected =
        paginatedData.length > 0 &&
        paginatedData.every((row) => selectedRows.includes(row.id));

    return (
        <div className="app">
            <div className="title-container">
                {/* <Typography variant="h4" component="h1" gutterBottom>
                    bTaskee
                </Typography> */}
                <img
                    width="154"
                    height="40"
                    src="https://www.btaskee.com/wp-content/uploads/2020/11/logo_btaskee_ver_3.png"
                    alt="logo_btaskee_ver_3"
                    loading="lazy"
                    sizes="(max-width: 154px) 100vw, 154px"
                ></img>
            </div>

            <div className="table-container">
                <TableContainer
                    component={Paper}
                    sx={{
                        width: '100vw',
                        border: '2px solid rgb(212, 204, 204)',
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="bees table">
                        <TableHead sx={{ backgroundColor: '#ffffff' }}>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        inputProps={{
                                            'aria-label': 'select all rows',
                                        }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {column.field === 'name' ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <TableSortLabel
                                                    active={
                                                        sortField ===
                                                        column.field
                                                    }
                                                    direction={sortDirection}
                                                    onClick={() =>
                                                        handleSort(column.field)
                                                    }
                                                >
                                                    {column.title}
                                                </TableSortLabel>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        setNameFilterVisible(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    <FilterListIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        ) : column.sortable ? (
                                            <TableSortLabel
                                                active={
                                                    sortField === column.field
                                                }
                                                direction={sortDirection}
                                                onClick={() =>
                                                    handleSort(column.field)
                                                }
                                            >
                                                {column.title}
                                            </TableSortLabel>
                                        ) : (
                                            column.title
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {nameFilterVisible && (
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell key={index}>
                                            {column.field === 'name' ? (
                                                <TextField
                                                    variant="standard"
                                                    value={nameFilter}
                                                    onChange={(e) =>
                                                        setNameFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Filter by name"
                                                    fullWidth
                                                    sx={{ width: '1200%' }}
                                                />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )}
                        </TableHead>
                        <TableBody sx={{ backgroundColor: '#f1dccb' }}>
                            {paginatedData.map((row) => {
                                const selected = isSelected(row.id);
                                return (
                                    <TableRow
                                        key={row.id}
                                        hover
                                        selected={selected}
                                        onClick={() => handleSelectRow(row.id)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selected}
                                                onChange={() =>
                                                    handleSelectRow(row.id)
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.name ?? 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {formatBalance(row.balance)}
                                        </TableCell>
                                        <TableCell>
                                            {row.email ? (
                                                <Link
                                                    href={`mailto:${row.email}`}
                                                    underline="hover"
                                                >
                                                    {row.email}
                                                </Link>
                                            ) : (
                                                'N/A'
                                            )}
                                        </TableCell>
                                        <TableCell
                                            title={formatFullDateTime(
                                                row.registerAt
                                            )}
                                        >
                                            {formatDateOnly(row.registerAt)}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                style={{
                                                    color: row.active
                                                        ? 'green'
                                                        : 'red',
                                                    fontWeight: 'bold',
                                                    border: '1px solid black',
                                                    borderRadius: '20px',
                                                    padding: '12px',
                                                }}
                                            >
                                                {row.active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(row);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(row);
                                                    }}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20]}
                        component="div"
                        count={typedUserData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <div className="result-length">
                    {typedUserData.length} results
                </div>
                <div className="theme-toggle">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default App;
