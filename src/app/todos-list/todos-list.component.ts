import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { TodosApiService } from "../todos-api.service"
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todos-card/todos-card.component";
import { TodosService } from "../todos.service";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly todosService = inject(TodosService);

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                // this.todos = response;
                this.todosService.setTodos(response);
            }
        )
    }
    deleteTodo (id: number) {
        this.todosService.deleteTodos(id);
    }
}