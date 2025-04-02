import { useContext } from 'react';

import { UserContext } from "../contexts/userContext";
const Home = () => {
  const isLoggedIn = useContext(UserContext)._id !== undefined;
  const email = useContext(UserContext).email;

  return (
    <>
      <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>
        Welcome to The Cool Company Inc.
      </h1>

      {isLoggedIn ? (
        <>
          <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            Hello <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{email}</span>! Welcome back to "The Cool Company" Inc. Employees management system!
          </p>
          <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            As you may already know You are able to manage the projects, employees and instruments of the company. You can add, edit and delete employees and instruments. You can also add new projects and assign employees to them. You can create new employees and assign them to projects. If someone of the employees needs an instrument, you can give it to him if we have free in the warehouse. You can also see all the projects of the company. You can manage the employees inside them. It is nice to remember that you can only manage the projects data on the projects that you've created. You can manage all the employees and instruments of the company.
          </p>
        </>
      ) : (
        <>
          <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            Hello Guest! Welcome to "The Cool Company" Inc. Employees management system!
          </p>
          <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            You are free to explore the projects of the company. You can see how different in scale and type the projects are. In this way you can get to know the company better.
          </p>
        </>
      )}

    </>
  );
};

export default Home;