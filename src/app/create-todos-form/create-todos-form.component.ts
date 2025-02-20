import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim().toLowerCase();
        if (value === "да" || value === "нет") {
            return null
        }
        return {invalidCompleted: true}
    }
}

@Component({
    selector: 'app-create-todos-form',
    templateUrl: './create-todos-form.html',
    styleUrl: './create-todos-form.scss',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf]
})
export class CreateTodosFormComponent {
    @Output()
    createTodo = new EventEmitter()

    public formTodo = new FormGroup ({
       title: new FormControl("", [Validators.required, Validators.minLength(3)]),
       userId: new FormControl("", [Validators.required]),
       completed: new FormControl("", [Validators.required, completedValidator()]),
    });

    private getCompleteValue(): boolean {
        const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
        if (value === "да")
            return true
        else return false
    }

    public submitForm(): void {
        this.createTodo.emit({...this.formTodo.value, completed: this.getCompleteValue()});
        this.formTodo.reset();
    }
}