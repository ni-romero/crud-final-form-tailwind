import '../../src/index.css';
import { render } from 'react-dom';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import React, { useState, useEffect } from "react";
import { OnChange } from "react-final-form-listeners";
import { data } from 'autoprefixer';



export const Formulario = (props) => {
  const [userEdit, setUserEdit] = useState(props.current)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', lastname: '', age: '', pais: '', provincia: '' }
  const [user, setUser] = useState(initialFormState)
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const [form, setForm] = useState(initialFormState);


  useEffect(() => {
    if (props.dataToEdit) {
      setForm(props.dataToEdit);
    } else {
      setForm(props.initailForm);
    }
  }, [props.dataToEdit]);

  const onSubmit = async (values, e) => {
    await sleep(300)

    console.log(JSON.stringify(values, 0, 2))

    props.addUser(values)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitEdit = async values => {
    await sleep(300)
    data.id = props.current.id
    props.updateUser(props.current.id, values)
    console.log('EDITAR', values)

  }

  useEffect(() => {
    setUserEdit(props.current)
  }, [props])



  // const handleInputChange = (event) => {
  //   const { name, value } = event.target

  //   setUser({ ...user, [name]: value })
  //   user.push(value)

  // }


  //VALIDACION FORMULARIO
  const required = value => (value ? undefined : 'Required')
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
  const composeValidators = (...validators) => value =>

    validators.reduce((error, validator) => error || validator(value), undefined)
  return (
    <>
      {/* <h3 className='text-2xl font-bold text-center my-5'>{props.dataToEdit ? "Editar Form" : "Agregar Form"}</h3> */}


      {/* COMIENZO FORM */}
      <div className='flex justify-center pb-24 mb-12'>

        {
          editing ? (
            <div>
              <h3 className='text-2xl font-bold text-center my-5'>EDITAR Form</h3>
              <Form class="shadow-2xl bg-base-100 cardBack"
                setEditing={setEditing}
                onSubmit={onSubmitEdit}
                initialValues={userEdit || {}}
                mutators={{
                  ...arrayMutators
                }}
                render={({
                  handleSubmit,
                  form: {
                    mutators: { push, pop }
                  },
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

            </div>
          ) :
            (
              <div>
                <h3 className='text-2xl font-bold text-center my-5'>AGREGAR Form</h3>
                <Form class="shadow-2xl bg-base-100 cardBack"
                  onSubmit={onSubmit}
                  mutators={{
                    ...arrayMutators
                  }}
                  render={({
                    handleSubmit,
                    form: {
                      mutators: { push, pop }
                    },
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

                        <button type="submit" className="btn btn-primary boton my-2" OnClick={() => this.props.history.push('/users')}>
                          Submit
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

              </div>
            )
        }


        {/* <Form class="shadow-2xl bg-base-100 cardBack"
    onSubmit={onSubmit}
    mutators={{
      ...arrayMutators
    }}
    render={({
      handleSubmit,
      form: {
        mutators: { push, pop }
      },
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
    
          <button type="submit" className="btn btn-primary boton my-2" OnClick={() => this.props.history.push('/users')}>
            Submit
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
  /> */}
      </div></>
  )
}
