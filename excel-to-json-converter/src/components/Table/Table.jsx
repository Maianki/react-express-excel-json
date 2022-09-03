/* eslint-disable import/no-named-as-default-member */
import './table.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import TableRow from './TableRow';
import getRace from '../../utils/getRace';
import Modal from '../Modal/Modal';

export default function Table() {
  const [users, setUsers] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/users');
        console.log(res);
        if (res.status === 200) {
          setUsers(res.data.users);
        }
      } catch (err) {
        toast.error(err.message);
      }
    })();
  }, []);

  const handleAllUsers = (users) => {
    setUsers(users);
  };

  const handleAddUser = () => {
    setIsOpen((prev) => !prev);
  };

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="description">
        {isOpen && (
          <Modal
            allRaces={getRace(users)}
            handleIsOpen={handleIsOpen}
            setAllUsers={handleAllUsers}
          />
        )}
        <p>
          <strong>Total users : {users ? users.length : 0} </strong>
        </p>
        <button className="btn-add-user" type="button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <table className="table">
        <thead>
          <tr className="table-heading">
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Race</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map(
              ({
                id,
                first_name: firstName,
                last_name: lastName,
                email,
                gender,
                race
              }) => {
                return (
                  <TableRow
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    gender={gender}
                    race={race}
                    handleIsOpen={handleIsOpen}
                    isOpen={isOpen}
                  />
                );
              }
            )}
        </tbody>
      </table>
      {!users && (
        <div className="spinner">
          <FadeLoader />
        </div>
      )}
    </>
  );
}
