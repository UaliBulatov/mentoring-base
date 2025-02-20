import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../user-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreatUserFormComponent } from "../create-user-form/create-user-form.component";

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    addres?: {
        srteet: string;
        suete: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website: string;
    company: {
        name: string;
        catchPrase?: string;
        bs?: string;
    };
}

export interface CreateUser1 {
    id: number;
    name: string;
    email: string;
    website: string;
    companyName: string;
}

@Component ({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreatUserFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.usersService.setUsers(response);
            }
        )
        this.usersService.usersSubject$.subscribe(
            (users: any) => console.log(users)
        )
    }

    deleteUser(id: number) {
        this.usersService.deleteUsers(id);
    }

    public createUser (formData: CreateUser1) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.companyName
            }
        })
    }
}