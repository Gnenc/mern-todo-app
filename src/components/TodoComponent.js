import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input, List, Modal } from 'semantic-ui-react'
import BackendApi from '../backendcomm/app2backend';

function TodoComponent() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [selectedTodo, setSelectedTodo] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const response = await BackendApi.getAllTodos();
            const todos = response.data;
            setTodos(todos);
        }
        fetchTodoAndSetTodos();
    }, []);

    const createTodo = async e => {
        e.preventDefault();
        if (!todo) {
            setAlertMsg("Please enter something");
            setAlertOpen(true);
            return;
        }
        if (todos.some(({ task }) => task === todo)) {
            setAlertMsg(`Task: ${todo} already exists`);
            setAlertOpen(true);
            return;
        }
        const response = await BackendApi.createTodo(todo);
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation();
            await BackendApi.deleteSelectedTodo(id);
            setTodos(todos.filter(({ _id: i }) => id !== i));
        } catch (err) { }
    };

    const updateTodo = async (e, id) => {
        e.stopPropagation();
        const payload = {
            completed: !todos.find(todo => todo._id === id).completed,
        };
        const response = await BackendApi.updateSelectedTodo(id, payload);
        const updatedTodo = response.data;
        setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    };

    const openTodo = async (e, id) => {
        e.stopPropagation();
        const response = await BackendApi.getSelectedTodo(id);
        const selected = response.data;
        setSelectedTodo(selected);
        setModalOpen(true);
    };

    return <div id="TodoComponentBlock">
        <Form>
            <Form.Field>
                <Input
                    label="TODO"
                    id="todo-input"
                    type="text"
                    value={todo}
                    onChange={({ target }) => setTodo(target.value)} />
            </Form.Field>
            <Button primary onClick={createTodo}> Add </Button>
        </Form>
        <div style={{ height: '45vh', overflow: 'auto', padding: 20 }}>
            <List divided verticalAlign='middle'>
                {todos.map(({ _id, task, completed }, i) => (
                    <List.Item key={i} onClick={e => updateTodo(e, _id)}>
                        <List.Content floated="right">
                            <Button icon onClick={e => openTodo(e, _id)}>
                                <Icon name='info circle' />
                            </Button>
                            <Button icon onClick={e => deleteTodo(e, _id)} negative>
                                <Icon name='delete' />
                            </Button>
                        </List.Content>
                        {completed ? <Icon name="check circle" color="green" /> : <Icon name="wait" color="red" />}
                        <List.Content>
                            {task}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Modal.Header>Selected Todo</Modal.Header>
            <Modal.Content>
                {`${selectedTodo.task} ${selectedTodo.completed ? "completed" : "not completed yet. Please hurry up."}`}
            </Modal.Content>
        </Modal>
        <Modal open={alertOpen} onClose={() => {
            setAlertOpen(false);
            setAlertMsg("");
        }}>
            <Modal.Header>
                <Icon name="warning sign" />
                ALERT
            </Modal.Header>
            <Modal.Content>
                {alertMsg}
            </Modal.Content>
        </Modal>
    </div>

}
export default TodoComponent;