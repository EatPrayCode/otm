import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, switchMap, map, catchError } from 'rxjs/operators'
import { EMPTY, forkJoin, of, combineLatest } from 'rxjs'
import * as resourcesActions from '../actions/resources.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { IPlaceType, IAmenity, IFacility } from '../models/resources.model'



@Injectable()
export class ResourcesEffects {


  @Effect()
  loadResourcess$ = this.actions$.pipe(
    ofType(resourcesActions.ResourcesActionTypes.LoadResources),
    switchMap(() => {
      console.log('TODO');
      const sources = [
        this.afs.collection<IPlaceType>(`propertyTypes`).valueChanges(),
        this.afs.collection<IAmenity>(`amenities`).valueChanges(),
        this.afs.collection<IFacility>(`facilities`).valueChanges(),
      ]
      return combineLatest(sources)
    }),
    map((res: any) => {
      const temp = {
        placesTypes: res[0],
        amenities: res[1],
        facilities: res[2]
      };
      const tempData = {
        "placesTypes": [
          {
            "id": "3U1IvDfOM3OtIRaEsu0O",
            "standAlone": true,
            "name_en": "Camp"
          },
          {
            "id": "FLuha0om6ZkDQWHfVDDQ",
            "standAlone": true,
            "name_en": "Apartment",
            "canBeBooked": true
          },
          {
            "standAlone": true,
            "canBeBooked": true,
            "name_en": "Chalet",
            "id": "Fkn3iO61mCZp2PvLYTen"
          },
          {
            "name_en": "Hostel",
            "id": "MpOSS5Pc2XDyFpuWJ3SU",
            "standAlone": true
          },
          {
            "canBeBooked": true,
            "standAlone": false,
            "id": "eLgABbmtQ9OUymonqsHJ",
            "name_en": "Private room"
          },
          {
            "id": "hhHXZdzsAzcwVQx4wRtC",
            "standAlone": false,
            "canBeBooked": true,
            "name_en": "Shared room"
          },
          {
            "id": "mklsKNzDL63UoBsK6l5U",
            "standAlone": true,
            "canBeBooked": true,
            "name_en": "Studio"
          }
        ],
        "amenities": [
          {
            "name_en": "kitchen",
            "id": "D6B8YNMSczzVrTCRpdnp",
            "icon": "room_service"
          },
          {
            "icon": "wifi",
            "id": "TzpQRN3kKD9WuVoGb9K3",
            "name_en": "Wifi"
          },
          {
            "name_en": "Air conditioning",
            "icon": "ac_unit",
            "id": "c6zeHnisDCJNV7UKTBxc"
          },
          {
            "icon": "local_laundry_service",
            "id": "jXaNMALdmNItAaLOtpyD",
            "name_en": "Washing Machine"
          },
          {
            "name_en": "Pets Friendly 🐕 🐈",
            "icon": "pets",
            "id": "tA6DqqT8aF64DVxBSFOR"
          },
          {
            "name_en": "Pool",
            "id": "yWCZlBmHp5RlqowBzqpi",
            "icon": "pool"
          }
        ],
        "facilities": []
      };
      return new resourcesActions.LoadResourcesSuccess(tempData);
    }),
    catchError(err => of(new resourcesActions.LoadResourcesFail(err))) // this means api failure
  )


  constructor(private actions$: Actions<resourcesActions.ResourcesActions>, private afs: AngularFirestore) { }

}
