/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import './modal.css';
import toast from 'react-hot-toast';
import { useUser } from '../../context/user-context';

export default function Modal({ allRaces, handleIsOpen, setAllUsers }) {
  const { currentUser, handleCurrentUser } = useUser();

  const [user, setUser] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    gender: currentUser.gender,
    race: currentUser.race ?? 'Dominican (Dominican Republic)'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(currentUser).length > 0) {
      try {
        const res = await axios.post(`/users/${currentUser.id}`, {
          ...user
        });
        if (res.status === 201) {
          setAllUsers(res.data.users);
          toast.success('User edited successfully!');
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      try {
        const res = await axios.post('/users', {
          ...user
        });
        if (res.status === 201) {
          setAllUsers(res.data.users);
          toast.success('User added successfully!');
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    handleCurrentUser({});
    handleIsOpen();
  };

  const handleBtnClose = () => {
    handleCurrentUser({});
    handleIsOpen();
  };

  return createPortal(
    <>
      <div className="overlay" onClick={handleIsOpen} />
      <div className="modal-wrapper">
        <div className="modal">
          <button className="btn-close" type="button" onClick={handleBtnClose}>
            X
          </button>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              placeholder="Enter first name"
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder="Enter last name"
              onChange={handleFormChange}
              required
            />
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter email"
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="gender"
              value={user.gender}
              placeholder="Enter gender"
              onChange={handleFormChange}
              required
            />
            <select value={user.race} onChange={handleFormChange} name="race">
              {allRaces.map((race, index) => {
                return (
                  <option key={index} value={race}>
                    {race}
                  </option>
                );
              })}
            </select>
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}
