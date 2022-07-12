import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), 
    minWidth: 100, 
    marginBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    padding: ' 0  10px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  listDesktop: {
    height: '75vh', 
    overflow: 'auto',
  },

  listMobile:{
    display:"flex", 
    flexDirection:"row",
    height:'45vh',
    width:'100vw',
    padding:'20px',
    overflow: 'auto',
  }
}));