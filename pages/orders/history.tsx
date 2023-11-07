import { ShopLayout } from '@/components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import NextLink from 'next/link'
import React from 'react'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'No0mbre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Esta orden ha sido pagada?',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid 
                    ? <Chip label='Pagado' variant='outlined' color='success'/>
                    : <Chip label='No Pagado' variant='outlined' color='error'/>
            )
        }
    },
    {
        field: 'order',
        headerName: 'Orden',
        description: 'Numero de orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        } 
    },
]

const rows = [
    { id: 1, paid: true, fullname: 'Snow Jon' },
    { id: 2, paid: true, fullname: 'Mas Juan' },
    { id: 3, paid: false, fullname: 'Rey Tomas' },
    { id: 4, paid: true, fullname: 'Lopez Edu' },
    { id: 5, paid: false, fullname: 'Zar Nobal' },
    { id: 6, paid: true, fullname: 'Trox Walter' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Hisorial'>
        <Typography variant='h1' component='h1'>Historial de Ordenes</Typography>
        

        <Grid container>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                >

                </DataGrid>

            </Grid>

        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage