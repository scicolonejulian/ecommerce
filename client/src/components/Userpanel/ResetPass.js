import React, {useState} from 'react';
import { useHistory, useParams} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../utils/Copyright'
import { useDispatch } from "react-redux";
import { userChangePassword} from "../../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  danger: {
    color: 'red'
  }
}));

export default function ResetPass() {
  const history = useHistory()
  const classes = useStyles();
  const [errors, setErrors] = useState({})

  const [password,setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  
  const dispatch = useDispatch()

  const {id} = useParams()

//   const handleChange = (event) => {
//     setPassword(event.target.value);
//     setconfirmPassword(event.target.)
//     setErrors(validate(event.target.name))
//   };

  const resetForm = () => {
    setPassword('')
    setconfirmPassword('')
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    dispatch(userChangePassword(password))
    resetForm()
    history.push(`/user/panel/${id}`)  
  }

  function validate(password) {
    if (!password  || password.length === 0) {
      errors.password = 'Contraseña requerida';
    } else if (!/(?=.*[0-9])/.test(password)) {
      errors.password = 'Contraseña invalida';
    } else if(password.length < 8){
      errors.password = 'La contraseña debe tener 8 o más caracteres'
    }
    // if (confirmPassword !== values.password) {
    //   errors.confirmPassword = 'No coinciden las contraseñas'
    // }
    return errors
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cambiar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {(!password || password.length < 8) && (<p className={classes.danger}>La contraseña debe ser mayor a 8 caracteres</p>)}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
            {confirmPassword !== password ? (<p className={classes.danger}>No coinciden las contraseñas</p>) : null}
            {!confirmPassword && (<p className={classes.danger}>Este campo es requerido</p>)}
    
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cambiar contraseña
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}