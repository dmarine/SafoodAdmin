import { Component, OnInit, TemplateRef } from '@angular/core';
import { Allergen } from 'src/app/models/allergen';
import { AllergensService } from 'src/app/services/allergens.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html'
})
export class AllergensComponent implements OnInit {
  allergens: Array<Allergen>
  returnedAllergens: Array<Allergen>
  totalItems: number

  allergen: Allergen
  allergensForm: FormGroup
  modalRef: BsModalRef
  titleModal: string
  buttonModal: string
  type: string
  paginator: PageChangedEvent
  currentPage: number

  constructor(private allergensService: AllergensService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  ngOnInit() { this.getAllergen() }

  getAllergen(): void {
    this.allergensService.getAllergens().subscribe(allergens => {
      this.allergens = allergens
      this.returnedAllergens = allergens.slice(0, 20);
      this.totalItems = allergens.length
    })

    this.allergensForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  addAllergen(template: TemplateRef<any>): void {
    this.type = "add"
    this.titleModal = "Añadir alergeno"
    this.buttonModal = "Añadir"
    this.form.name.setValue("")
    this.modalRef = this.modalService.show(template)
  }

  editAllergen(template: TemplateRef<any>, allergen: Allergen): void {
    this.type = "edit"
    this.titleModal = "Editar alergeno"
    this.buttonModal = "Editar"
    this.allergen = allergen
    this.form.name.setValue(allergen.name)
    this.modalRef = this.modalService.show(template)
  }

  deleteAllergen(allergen: Allergen): void {
    this.allergensService.deleteAllergen(allergen).subscribe(allergen => {
      this.allergens = this.allergens.filter(a => a.id !== allergen.id)
      this.formEdited()
    })
  }

  onSubmit(type: string) {
    if (this.allergensForm.invalid) { return }

    switch (type) {
      case "add":
        this.allergensService.createAllergen(new Allergen(null, this.form.name.value)).subscribe(allergen => {
          this.allergens.push(allergen)
          this.totalItems += 1
          this.formEdited()
        })
        break;
      case "edit":
        this.allergen.name = this.form.name.value
        this.allergensService.updateAllergen(this.allergen).subscribe()
        break;
    }
    this.modalRef.hide()
  }

  get form() { return this.allergensForm.controls; }

  pageChanged(event: PageChangedEvent): void {
    this.paginator = event
    const startItem = (this.paginator.page - 1) * this.paginator.itemsPerPage;
    const endItem = this.paginator.page * this.paginator.itemsPerPage;
    this.returnedAllergens = this.allergens.slice(startItem, endItem);
  }

  formEdited(): void {
    if(this.paginator) {
      this.totalItems = this.allergens.length
      const startItem = (this.paginator.page - 1) * this.paginator.itemsPerPage;
      const endItem = this.paginator.page * this.paginator.itemsPerPage;
      this.returnedAllergens = this.allergens.slice(startItem, endItem);
    }
  }
}
