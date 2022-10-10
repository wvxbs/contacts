import { Injectable } from "@angular/core";
// import IPessoa from './interfaces/ipessoa'
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})

export class DadosService { 
  public pessoas: IPessoa[] = [
    {id: 1, nome: 'Jose', telefone: '(11)91', detalhes: 'trabalho'},
    {id: 2, nome: 'Jose', telefone: '(11)91', detalhes: 'trabalho'},
    {id: 3, nome: 'Jose', telefone: '(11)91', detalhes: 'trabalho'},
  ]

  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
    this.storage.create().then(() => console.log('Armazenamento Criado'))
    this.storage.get('contatos')
      .then(contatos => this.pessoas.push(...contatos))
      .catch(() => this.storage.set('contatos', this.pessoas))
  }

  buscarDados(): IPessoa[] {
    return this.pessoas;
  }

  stalvar(pessoa: IPessoa): void {
    pessoa.id = this.pessoas.length + 1
    this.pessoas.push(pessoa)
    this.storage.set('contatos', this.pessoas)
  }

  deletar(indice: number): void {
    this.pessoas.splice(indice -1,1)
    this.atualizarIds()
    this.storage.set('contatos', this.pessoas)
  }

  atualizarIds(): void{
    this.pessoas.forEach((pessoa => this.pessoas.indexOf(pessoa)))
  }
}