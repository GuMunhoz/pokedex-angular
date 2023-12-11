import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiServiceService } from 'src/app/service/poke-api-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;
  constructor(
    private activedRouter: ActivatedRoute,
    private pokeAPiService: PokeApiServiceService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }
 getPokemon() {
  const id = this.activedRouter.snapshot.params['id'];
  const pokemon = this.pokeAPiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
  const name = this.pokeAPiService.apiGetPokemon(`${this.urlName}/${id}`);
  return forkJoin([pokemon, name]).subscribe(
    res => {
      this.pokemon = res;
      this.isLoading = true;
    },
    error => {
      this.apiError = true;
    }
  )


}
}
