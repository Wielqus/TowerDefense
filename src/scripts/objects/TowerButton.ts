import ITower from "../Interfaces/ITower"
import CollectionsList from "./CollectionsList"

const ASSET_URL = '../../assets/towers/';

export default class TowerButton{
    towerData: ITower
    active: boolean
    observer: CollectionsList
    container: HTMLElement
    
    
    constructor(tower: ITower, observer: CollectionsList){
        this.active = false;
        this.towerData = tower;
        this.observer = observer;
        this.container;
        this.create();
        this.container.addEventListener('click', ()=>{
            this.isActive() ? this.deactivate(): this.activate()
        })
        return this;
    }

    create(){
        this.container = document.createElement('div');
        
        this.container.classList.add('towerList__card');
        
        const towerList__li = document.createElement('li');
        towerList__li.classList.add('towerList__li');

        const image = document.createElement('img');
        image.setAttribute('src', ASSET_URL + this.towerData.source);
        
        const button = document.createElement('button');
        button.classList.add('towerList__button');
        button.textContent = String(this.towerData.price)

        towerList__li.appendChild(image)
        this.container.appendChild(towerList__li)
        this.container.appendChild(button)
        
        const destination = document.querySelector('.towerList__ul');
        destination?.appendChild(this.container);

    }

    isActive():boolean{
        return this.active;
    }

    activate = () =>{
        this.active = true;
        this.observer.removeActiveButton();
        this.observer.addActiveButton(this);
        this.container.classList.add('active');
    }
    deactivate(){
        this.active = false;
        this.container.classList.remove('active');
    }
}
