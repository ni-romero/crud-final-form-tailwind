import '../../src/index.css';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import React, { useState, useEffect } from "react";
import { data } from 'autoprefixer';


export const EditUserForm = (props) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const [user, setUser] = useState(props.current)


    const onSubmit = async values => {
        await sleep(300)
        data.id = props.current.id
        props.updateUser(props.current.id, values)
        console.log('EDITAR', values)

    }

    useEffect(() => {
        setUser(props.current)
    }, [props])


    //VALIDACION FORM
    const required = value => (value ? undefined : 'Required')
    const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    return (
        <>
            {/* COMIENZO FORM */}
            <h1 className='text-center text-3xl text-bold pt-12 mt-5 font-serif' id='comienzo'>Editar</h1>
            <div className='flex justify-center pb-24 mb-12'>
                <Form class="shadow-2xl bg-base-100 cardBack"
                    onSubmit={onSubmit}
                    initialValues={user || {}}
                    mutators={{
                        ...arrayMutators
                    }}
                    render={({
                        handleSubmit,
                        form: {
                            mutators: { push, pop }
                        }, // injected from final-form-arrays above
                        pristine,
                        form,
                        submitting,
                        values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="name" validate={required}>
                                {({ input, meta }) => (
                                    <div>

                                        <input {...input} type="text" placeholder="First Name333" class="input  my-2" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="lastname" validate={required}  >
                                {({ input, meta }) => (
                                    <div>

                                        <input {...input} type="text" placeholder="Last Name " class="input my-2" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field
                                name="age"
                                validate={composeValidators(required, minValue(18))}
                            >
                                {({ input, meta }) => (
                                    <div>

                                        <input {...input} type="text" placeholder="Age" class="input  my-2" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>


                            <Field name="pais" validate={required}  >
                                {({ input, meta }) => (
                                    <div>

                                        <input {...input} type="text" placeholder="Pais " class="input my-2" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="provincia" validate={required}  >
                                {({ input, meta }) => (
                                    <div>

                                        <input {...input} type="text" placeholder="provincia " class="input my-2" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <div className="buttons">
                                <button
                                    type="button" className='text-blue-500'
                                    onClick={() => push('customers', undefined)}
                                >
                                    Agregar un nuevo dato
                                </button>

                            </div>
                            <FieldArray name="customers">
                                {({ fields }) =>
                                    fields.map((name, index) => (
                                        <div key={name}>
                                            <label>Nuevo campo #{index + 1}</label>
                                            <br></br>
                                            <Field class="input  my-2"
                                                name={`${name}.campo1`}
                                                component="input"
                                                placeholder="Nuevo campo"
                                            /> <br></br>
                                            <Field class="input  my-2"
                                                name={`${name}.campo2`}
                                                component="input"
                                                placeholder="Descripcion"
                                            />
                                            <span
                                                onClick={() => fields.remove(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                ❌
                                            </span>
                                        </div>
                                    ))
                                }
                            </FieldArray>

                            <div className="buttons" validate={composeValidators(required)}>
                                <button type="submit" className="btn btn-primary boton my-2">
                                    EDITAR
                                </button>
                            </div>
                            <div className='buttons'>
                                <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                    className="btn btn-purple-500 boton ">
                                    Reset
                                </button>
                            </div>



                        </form>
                    )}
                />
            </div></>
    )
}

