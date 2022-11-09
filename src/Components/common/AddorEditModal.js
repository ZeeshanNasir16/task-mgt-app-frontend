import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DateTimePicker from 'react-datetime-picker';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';

const useStyles = makeStyles((props) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      minHeight: props.role === 'Task' && 450
    }
  },
  addBtn: {},
  cancelBtn: {}
}));

const initialStageState = {
  name: '',
  description: ''
};

const AddorEditModal = (props) => {
  const [stages, setStages] = useState([{ ...initialStageState, _id: uuid() }]);
  const { user } = useContext(AuthContext);

  const { isOpen, closeDialog, createNew, role, isEdit, editUser, updateUser, viewOnly } = props;
  const [deadLine, setDeadLine] = useState(new Date());
  const classes = useStyles(props);

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    description: ''
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // TODO
    if (isEdit === true && editUser) {
      setState({
        name: editUser.name,
        email: editUser.email,
        description: editUser.description
      });

      if (editUser.stages) setStages(editUser.stages);
      if (editUser.deadLine) setDeadLine(new Date(editUser.deadLine));
    } else {
      setState(initialState);
      setStages([initialStageState]);
    }
  }, [editUser, isEdit]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleStageChange = (e, stage) => {
    let current = stages.find((el) => JSON.stringify(el._id) === JSON.stringify(stage._id));
    if (!current) return;

    current = {
      ...current,
      [e.target.name]: e.target.value
    };

    setStages((st) =>
      st.map((el) => (JSON.stringify(el._id) === JSON.stringify(stage._id) ? current : el))
    );
  };

  const checkStages = () => {
    let condition = true;
    stages.forEach((stage) => {
      if (
        !stage.name ||
        !stage.description ||
        !stage.name.length > 0 ||
        !stage.description.length > 0
      )
        condition = false;
    });

    return condition;
  };

  const addNewStage = () => {
    if (checkStages() === false) {
      toast.error('Plz fill previous stages before creating new stage');
      return;
    }
    const newStage = { ...initialStageState, _id: uuid() };
    setStages((st) => [...st, newStage]);
  };

  const deleteStage = (id) => {
    setStages((st) => st.filter((el) => el._id !== id));
  };

  const filterStages = () => {
    console.clear();
    console.log(`stages`, stages);
    let newStages = [];
    newStages = stages;
    console.log(`newStages`, newStages);

    newStages.forEach((el) => {
      if (el._id) delete el._id;
    });
    console.log(`newStages`, newStages);

    return newStages;
  };

  const handleSubmit = (e) => {
    if (role === 'Task') {
      if (
        !state.name ||
        !state.name.length > 0 ||
        !state.description ||
        !state.description.length > 0
      ) {
        toast.error('Plz fill in all fields before creating task');
        return;
      }
      if (checkStages() === false) {
        toast.error('Plz fill in all stages before creating task');
        return;
      }
      if (isEdit)
        updateUser(editUser._id, {
          name: state.name,
          description: state.description,
          stages: filterStages(),
          deadLine
        });
      else
        createNew({
          name: state.name,
          description: state.description,
          stages: filterStages(),
          // stages,
          deadLine
        });
    } else if (isEdit) {
      updateUser(editUser._id, { name: state.name, email: state.email });
    } else {
      createNew(state);
    }
    e.preventDefault();
  };

  const handleClose = () => {
    setState(initialState);
    closeDialog();
  };

  return (
    <div>
      <Dialog
        className={classes.Dialog}
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEdit ? `Edit ${editUser && role}` : `Add New ${role}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={state.name}
            name="name"
            onChange={handleChange}
            disabled={viewOnly}
          />

          {role === 'Manager' ||
            (role === 'Employee' && (
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={state.email}
                onChange={handleChange}
              />
            ))}

          {role === 'Task' && (
            <>
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="description"
                fullWidth
                value={state.description}
                onChange={handleChange}
                disabled={viewOnly}
              />
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="flex-start"
                minHeight={60}
                flexDirection="column"
                marginBottom="10px"
                marginTop="10px"
              >
                <Typography
                  variant="p"
                  component="p"
                  style={{
                    marginBottom: '10px !important'
                  }}
                >
                  Deadline
                </Typography>
                <DateTimePicker
                  disabled={viewOnly}
                  value={deadLine}
                  onChange={setDeadLine}
                  disableClock
                />
              </Box>
              <Divider style={{ marginBlock: 20 }} />
              <Typography
                variant="h6"
                component="p"
                style={{
                  marginBottom: '10px !important',
                  textAlign: 'center'
                }}
              >
                Stages
              </Typography>
              <Button startIcon={<AddIcon />} onClick={addNewStage} disabled={viewOnly}>
                Add Stage
              </Button>
              <Box>
                {stages.map((stage, idx) => (
                  <Box
                    key={stage._id}
                    style={{
                      border: '1px solid #ccc',
                      padding: '15px 20px'
                    }}
                  >
                    <h4
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      Stage {idx + 1}
                      {viewOnly && (
                        <>
                          {stage.status === 'inProgress' ? (
                            <Button startIcon={<DoneIcon />}>Complete Stage</Button>
                          ) : (
                            <Typography color="success">{stage.status}</Typography>
                          )}
                        </>
                      )}
                      {idx > 0 && !viewOnly && (
                        <Button
                          startIcon={
                            <CloseIcon
                              onClick={() => deleteStage(stage._id)}
                              style={{ cursor: 'pointer' }}
                            />
                          }
                        ></Button>
                      )}
                    </h4>
                    <TextField
                      margin="dense"
                      id="name"
                      name="name"
                      label="Name"
                      type="name"
                      fullWidth
                      value={stage.name}
                      onChange={(e) => handleStageChange(e, stage)}
                      disabled={viewOnly}
                    />
                    <TextField
                      margin="dense"
                      id="description"
                      name="description"
                      label="Description"
                      type="description"
                      fullWidth
                      value={stage.description}
                      onChange={(e) => handleStageChange(e, stage)}
                      disabled={viewOnly}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}

          {(!isEdit && role === 'manager') ||
            (role === 'Employee' && (
              <>
                {!isEdit && (
                  <>
                    {' '}
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      value={state.password}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="dense"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      label="Password Confirm"
                      type="password"
                      fullWidth
                      value={state.passwordConfirm}
                      onChange={handleChange}
                    />
                  </>
                )}
              </>
            ))}
          {role === 'Manager' && (
            <>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={state.email}
                onChange={handleChange}
              />
              {!isEdit && (
                <>
                  <TextField
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={state.password}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    label="Password Confirm"
                    type="password"
                    fullWidth
                    value={state.passwordConfirm}
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit === true ? 'Update' : 'Create'}
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddorEditModal;
