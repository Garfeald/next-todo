
import CircularProgress from '@mui/material/CircularProgress';

export default async function Loading() {



    return <div style={{
        width: '100%',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <CircularProgress />
        <h2 style={{ paddingLeft: '20px', color: '#1976d2' }}>...loading</h2>
    </div>

}
