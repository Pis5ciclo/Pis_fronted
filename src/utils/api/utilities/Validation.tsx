import * as Yup from 'yup';

import { useCallback, useState } from 'react';

const Validation = (schema: Yup.ObjectSchema) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = async (data: any) => {
        try {
            await schema.validate(data, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };
    const resetErrors = useCallback(() => {
        setErrors({});
    }, []);

    return { errors, validate, resetErrors };
};

export default Validation;
