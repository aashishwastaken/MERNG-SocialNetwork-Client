import React, { useContext, useState } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import * as queryString from 'query-string';
import 'semantic-ui-css/semantic.min.css';
import '../App.css';
import {useForm} from '../utils/hooks';
import {AuthContext} from '../context/auth';

///////////////////////////////////////////////////////////////////////////////////////////////////////

const stringifiedParams=queryString.stringify({
    client_id:process.env.GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri:'https://merng-social-network-client.herokuapp.com/authenticate/google',
    scope:['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'].join(' '),
    response_type:'code',
    assecc_type:'offline',
    prompt:'consent'
});

const googleLoginUrl=`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;



const LOGIN_USER = gql`
mutation login($username:String!
               $password:String!){
   login(loginInput:{username:$username,
    			     password:$password}){
    id
    username
    email
    token
    createdAt
    
  }
}`;

export default function Login(props) {
    let context=useContext(AuthContext);
    const [errors,setErrors]=useState({});
   // console.log("errors=>"+JSON.stringify(errors));
   
const {values, onSubmit,onChange}=useForm(loginUserCallback,{ 
    username: '',
    password: ''
});

    const [loginUser, { loading }] = useMutation(LOGIN_USER,{
        update(proxy,result){
            setErrors({});
            context.login(result.data.login);
            props.history.push('/');
        },
        onError(err){
           //console.log(err.graphQLErrors[0].extensions.exception);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables:values
    });



function loginUserCallback(){
    loginUser();
}

   
    return (
        <div>
            <Form onSubmit={onSubmit} error className={loading?'forms loading':' forms'}>
                <h2 style={{textAlign:'center'}}>Login</h2>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Enter username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    error={(errors.username)?true:false}
                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={(errors.password)?true:false}
                />
               


{(typeof errors==='string')?<Message error
      header='Errors'
      content={errors} />:Object.values(errors).length>0?(<Message
      error
      header='Errors'
      list={Object.values(errors)}
    />):<div></div>}

                <Button type="submit" fluid primary >
                    Login
                </Button>
               <div style={{margin:'1em', textAlign:'center' }}> OR</div>
                <Button type='button' href={googleLoginUrl}  fluid primary >
                Login Via Google
                    <Icon name="google" style={{marginLeft:'0.5em'}} />
                    </Button>
            </Form>
        </div>
    )
}
