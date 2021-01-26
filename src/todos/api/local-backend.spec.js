import api from './local-backend';

describe('Local Backend', () => {

    beforeEach(() => { localStorage.clear(); });

    it('has initially zero todos', (done) => {
        api.getAll().then((todos) => {
            expect(todos.length).toBe(0);
            done();
        });
    });

    it('can create new todos', async () => {
        const title = 'Async Tests';
        const todo = await api.create(title);
        expect(todo.title).toBe(title);
        expect(todo.completed).toBeFalsy();
    });

    it('stores new todos', async () => {
        await api.create('Item One');
        await api.create('Item Two');
        const todos = await api.getAll();
        expect(todos.length).toBe(2);
    });

    it('can toggle a todo completed state', async () => {
        await api.create('Item One');
        const id = (await api.create('Item Two')).id;
        const todo = await api.update(id, { completed: true });
        expect(todo.title).toBe('Item Two');
        expect(todo.completed).toBeTruthy();
    });

    it('can update a todo title', async () => {
        await api.create('Item One');
        const id = (await api.create('Item Three')).id;
        const todo = await api.update(id, { title: 'Item Two' });
        expect(todo.title).toBe('Item Two');
        expect(todo.completed).toBeFalsy();
    });

    it('can delete a todo item', async () => {
        await api.create('Item One');
        const id = (await api.create('Item Two')).id;
        await api.create('Item Three');
        await api.create('Item Four');
        const deletedId = await api.destroy(id);
        expect(deletedId).toBe(id);
        const todos = await api.getAll();
        expect(todos.length).toBe(3);
    });
});
