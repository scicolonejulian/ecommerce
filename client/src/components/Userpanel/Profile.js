import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {setUser, getUserDetail} from '../../actions'
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
/////////////////////////////
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Copyright from '../utils/Copyright'
//////////////////////////////

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

const Profile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const [user,Setuser] = useState('')
    // const [dir,Setdir] = useState(user.address)
    // const [phone,SetPhone] = useState(user.phone)
    const { id } = useParams()
    //////////////////////////////////
    const classes = useStyles();
    // const [errors, setErrors] = useState({})
    const [confirmPassword, setconfirmPassword] = useState('')
    const [user, Setuser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: ''
    });
    const [dir,Setdir] = useState(user.address)
    const [phone,SetPhone] = useState(user.phone)

    const handleChange = (event) => {
      // setErrors(validate({ ...user, [event.target.name]: event.target.value }))
      Setuser({ ...user, [event.target.name]: event.target.value });
    };

    function validate(values) {
      let errors = {};
      if (!values.firstName  || values.firstName.length === 0) {
        errors.firstName = 'El nombre es requerido';
      }
  
      if (!values.lastName || values.lastName.length === 0) {
        errors.lastName = 'El apellido es requerido';
      }
  
      if (!values.email  || values.email.length === 0) {
        errors.email = 'Email requerido';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email invalido';
      }
      
      if (!values.password  || values.password.length === 0) {
        errors.password = 'Contraseña requerida';
      } else if (!/(?=.*[0-9])/.test(values.password)) {
        errors.password = 'Contraseña invalida';
      } else if(values.password.length < 8){
        errors.password = 'La contraseña debe tener 8 o más caracteres'
      }
      // if (confirmPassword !== values.password) {
      //   errors.confirmPassword = 'No coinciden las contraseñas'
      // }
      return errors
    }

    ////////////////////////////

    useEffect(() => {
        fetch(`http://localhost:3001/user/${id}`)
        .then(res=>res.json())
        .then(data=> {
            Setdir(data.address);
            SetPhone(data.phone);
            Setuser(data);
            dispatch(setUser(data))
        })
    }, [])


    const handleChangeDir = (e) => {
        Setdir(e.target.value)
    }
    const handleChangePhone = (e) => {
        SetPhone(e.target.value)
    }
    const handleSubmit = async function (e) {
        e.preventDefault()
        const envio = {
            address: user.address,
            phone: user.phone
        }
       try {
            const fetchdata = await fetch(`http://localhost:3001/user/${id}`,
            {
            method: 'PATCH',
            body: JSON.stringify(envio),
            headers:{
                'Content-Type': 'application/json'
            }
            })  
            swal("Success","Datos actualizados","success");
            history.push(`/user/panel/${id}`)                   
        } catch (error) {swal("error", "error al actualizar los datos, intente de nuevo", "error")            
        }               
      }

      console.log(user)
    
    // return (user && <div>
    //     <h1>Mi perfil</h1>
    // <h3>Tu nombre: {user.firstName} {user.lastName}</h3>
    // <h3>Tu mail: {user.email}</h3>
    // {user.address && user.address.length > 0 ? <h3> Tu dirección : {user.address}</h3> : null}
    // {user.phone && user.phone.length > 0 ? <h3> Tu teléfono : {user.phone}</h3> : null}
    // <h3>Edita dirección y teléfono</h3>

    //         <Grid item xs={12}>
    //           <TextField
    //             fullWidth
    //             id="outlined-textarea"
    //             label="Dirección"
    //             value={dir}
    //             multiline
    //             variant="outlined"
    //             onChange={handleChangeDir}
    //             required
    //             name='dirección'
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             fullWidth
    //             id="outlined-textarea"
    //             label="Teléfono"
    //             value={phone}
    //             multiline
    //             variant="outlined"
    //             onChange={handleChangePhone}
    //             required
    //             name='teléfono'
    //           />
    //         </Grid>
    //         <Button onClick={handleSubmit}
    //         disabled = { !dir || !phone}
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //       >
    //         Actualizar datos
    //       </Button>

    // </div>       
    // )

/////////////////////////////////////////////

    return (
      user &&
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={user.firstName}
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                onChange={handleChange}
                label="Nombre"
                id="firstName"
                autoFocus
              />
              {/* {errors.firstName && (<p className={classes.danger}>{errors.firstName}</p>)} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={user.lastName}
                id="lastName"
                label="Apellido"
                name="lastName"
                // autoComplete="lname"
              />
            {/* {errors.lastName && (<p className={classes.danger}>{errors.lastName}</p>)} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={user.email}
                id="email"
                label="Correo electronico"
                name="email"
                // autoComplete="lname"
                disabled
              />
            {/* {errors.lastName && (<p className={classes.danger}>{errors.lastName}</p>)} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                onChange={handleChange}
                value={user.address}
                name="address"
                label="Direccion"
                // type="address"
                id="address"
                // autoComplete="current-password"
              />
            </Grid>
            {/* {errors.password && (<p className={classes.danger}>{errors.password}</p>)} */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                onChange={handleChange}
                value={user.phone}
                name="phone"
                label="Telefono"
                id="phone"
                type='number'
                // autoComplete="current-password"
              />
            </Grid>
            {/* {confirmPassword !== user.password ? (<p className={classes.danger}>No coinciden las contraseñas</p>) : null} */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar cambios
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    )
}

export default Profile