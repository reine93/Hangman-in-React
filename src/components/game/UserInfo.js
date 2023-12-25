import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlayerName } from '../../redux/gameState';
import Button from '../page-element/Button';
import InputField from '../page-element/InputField';

function NameEditor({ inputText, handleNameChange, handleSubmit }) {
  return (
    <form className="flex justify start" onSubmit={handleSubmit}>
      <InputField
        value={inputText}
        onChange={handleNameChange}
        required
      />
      <Button className="w-14 h-6 text-xs" primary>Save</Button>
    </form>
  );
}

function NameDisplay({ playerName, setNameEdit }) {
  return (
    <div onClick={() => setNameEdit(true)}>
      Player name:
      <span className="hover:animate-pulse">{playerName}</span>
    </div>
  );
}

function UserInfo() {
  const { errorNum, playerName } = useSelector((state) => state.game);
  const [editingName, setNameEdit] = useState(false);
  const [inputText, setInputText] = useState(playerName);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePlayerName(inputText));
    setNameEdit(false);
  };

  return (
    <div>
      <div>
        {editingName
          ? (
            <NameEditor
              inputText={inputText}
              handleNameChange={handleNameChange}
              handleSubmit={handleSubmit}
            />
          )
          : <NameDisplay playerName={playerName} setNameEdit={setNameEdit} />}
      </div>
      <div>
        Errors:
        {' '}
        {errorNum}
      </div>
    </div>
  );
}

export default UserInfo;
