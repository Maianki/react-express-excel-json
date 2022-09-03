/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useUser } from '../../context/user-context';

export default function TableRow({
  id,
  firstName,
  lastName,
  email,
  gender,
  race,
  handleIsOpen
}) {
  const { handleCurrentUser } = useUser();

  const handleEdit = () => {
    handleIsOpen();
    handleCurrentUser({ id, firstName, lastName, email, gender, race });
  };

  return (
    <tr className="table-rows">
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td className="row-email">{email}</td>
      <td className="row-gender">{gender}</td>
      <td className="row-race">{race}</td>
      <td className="row-edit" onClick={handleEdit}>
        Edit
      </td>
    </tr>
  );
}
