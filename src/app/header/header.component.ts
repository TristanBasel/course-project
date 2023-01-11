import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;

  // @Output() featureSelected = new EventEmitter<string>(); // emits the event
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }

  constructor(private  dataStorageService: DataStorageService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();// because of the tap method we added in the service we change the subscribe method to here.
    // helpful now for the recipe-resolver service, we can just return the observable from the resolve function.
  }

}
