import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-my-company',
  templateUrl: './setting-my-company.component.html',
  styleUrls: ['./setting-my-company.component.scss'],
})
export class SettingMyCompanyComponent implements OnInit {
  formCustomer!: FormGroup;
  selectedFiles: File[] = [];
  nextId = 1;
  categorys: any;
  roles: any;
  hide = true;
  formEditValues: any;
  completeForm: any;
  getId: any;
  jsonString: any;
  desable = true;
  defaultImages: string[] = Array(9).fill('grey-image-url'); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    this.jsonString = localStorage.getItem('userId');
    this.getId = JSON.parse(this.jsonString);
    this.setInitialFormVoid();
  }

  ngOnInit() {
    this.customerService.getCategorias().subscribe((data) => {
      this.categorys = data;
    });

    this.customerService.getRoles().subscribe((data) => {
      this.roles = data;
    });

    this.customerService.getCustumerById(this.getId.id).subscribe((data) => {
      this.formEditValues = data;
      this.editForm();
    });
  }

  setInitialFormVoid() {
    this.formCustomer = this.formBuilder.group({
      id: this.getId,
      customer: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      celNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(15),
        ],
      ],
      CEP: ['', Validators.required],
      address: ['', Validators.required],
      addressNumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
      status: true,
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      description: [''],
    });
  }

  editForm() {
    this.formCustomer.patchValue(this.formEditValues);
  }

  edit() {
    if (this.formCustomer.valid) {
      const formData = this.formCustomer.value;
      this.customerService.editEstabelecimento(formData).subscribe(
        (response) => {
          this.openSnackBar('Estabelecimento Editado com sucesso', 'Fechar');
          this.router.navigate(['/customer']);
        },
        (error) => {
          this.openSnackBar(
            'Erro ao editar estabelecimento, verifique se todos os dados devem ser preenchidos',
            'Fechar'
          );
        }
      );
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }

  save() {
    if (this.formCustomer.valid) {
      const formData = this.formCustomer.value;
      this.customerService.editEstabelecimento(formData).subscribe(
        (response) => {
          this.openSnackBar('Estabelecimento Editado com sucesso', 'Fechar');
        },
        (error) => {
          this.openSnackBar(
            'Erro ao editar estabelecimento, verifique se todos os dados devem ser preenchidos',
            'Fechar'
          );
        }
      );
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  clean() {
    this.editForm();
  }

  onCepBlur() {
    const formCustomer = this.formCustomer;

    if (formCustomer) {
      const cepControl = formCustomer.get('CEP');

      if (cepControl) {
        const CEP = cepControl.value;

        if (CEP && CEP.length === 8) {
          this.customerService.getAddressByCep(CEP).subscribe(
            (data) => {
              formCustomer.patchValue({
                address: data.logradouro,
                city: data.localidade,
                state: data.uf,
              });
            },
            (error) => {
              console.error('Erro ao buscar o endereço:', error);
            }
          );
        }
      }
    }
  }

  formatPhoneNumber() {
    const celNumberControl = this.formCustomer.get('celNumber');
    if (celNumberControl) {
      let phoneNumber = celNumberControl.value.toString().replace(/\D/g, '');
      if (phoneNumber.length === 11) {
        phoneNumber = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(
          2,
          7
        )}-${phoneNumber.substring(7)}`;
        celNumberControl.setValue(phoneNumber, { emitEvent: false });
      }
    }
  }

  formatCnpj() {
    const cnpjControl = this.formCustomer.get('cnpj');
    if (cnpjControl) {
      let cnpj = cnpjControl.value.toString().replace(/\D/g, '');
      if (cnpj.length === 14) {
        cnpj = `${cnpj.substring(0, 2)}.${cnpj.substring(
          2,
          5
        )}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(
          12
        )}`;
        cnpjControl.setValue(cnpj, { emitEvent: false });
      }
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (this.selectedFiles.length + files.length <= 9) {
      this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
    } else {
      console.warn('Número máximo de imagens atingido (9).');
    }
  }

  onAddImage(): void {
    if (this.selectedFiles.length < 9) {
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.multiple = true;
      inputElement.addEventListener('change', (event: any) => {
        this.onFileSelected(event);
      });
      inputElement.click();
    } else {
      this.openSnackBar('Número máximo de imagens atingido (9).', 'Fechar');
    }
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      console.log('Arquivos enviados:', this.selectedFiles);
    } else {
      console.warn('Nenhum arquivo selecionado para upload.');
    }
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}

