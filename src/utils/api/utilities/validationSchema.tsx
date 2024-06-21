// validationSchema.js
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    external_id: Yup.string().required('Campo requerido'),
    name: Yup.string().required('Campo requerido'),
    lastname: Yup.string().required('Campo requerido'),
    phone: Yup.number().required('Campo requerido'),
    identification: Yup.string().required('Campo requerido'),
    rol: Yup.string().required('Campo requerido'),
    email: Yup.string().email('Email inválido').required('Campo requerido'),
    status: Yup.string().required('Campo requerido'),
    password: Yup.string().required('Campo requerido')
});

export default validationSchema;
