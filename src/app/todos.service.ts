import { Injectable, input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todos-list/todos-list.component";

@Injectable({providedIn: 'root'})
export class TodosService {
    todosSubject$ = new BehaviorSubject<Todo[]>([]);

    setTodos (todos: Todo[]) {
        this.todosSubject$.next(todos);
    }

    editTodo (editedTodo: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => {
                    if (todo.id === editedTodo.id) {
                        return editedTodo
                    } else {
                        return todo 
                    }
                }
            )
        )
    }

    createTodo (todo: Todo) {
        this.todosSubject$.next(
            [...this.todosSubject$.value, todo]
        )
    }

    deleteTodos (id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                todo => {
                    if (id === todo.id) {
                        return false;
                    } else {
                        return true;
                    }
                }
            )
        )
    }
}