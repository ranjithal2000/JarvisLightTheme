// import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
// import { Injectable } from '@angular/core'; import { Subject } from 'rxjs'; 
// // import { LoginService } from './services/login.service';

// const oAuthConfig: AuthConfig = { 
//     issuer: 'https://accounts.google.com', 
//     strictDiscoveryDocumentValidation: false,
//     redirectUri: 'http://localhost:4400', 
//     clientId: '49837490525-2oqmk026oaang6omfk12v0d29rkomnha.apps.googleusercontent.com', 
//     scope: 'openid profile email' 
// }

// export interface UserInfo {
//      info: { 
//         sub: string, //Identifier for the user 
//         email: string, 
//         name: string, 
//         picture: string 
//     } 
//     }
//     @Injectable({
//          providedIn: 'root' 
//         })

// export class GoogleApiService {

//     userProfileSubject = new Subject<UserInfo>() 
//     demo:any; 
//     abc:any; 
//     authorized:any; 
//     abc2:any;

//     constructor(private readonly oAuthService: OAuthService) { }

//     googleLogin() { 
//         this.oAuthService.configure(oAuthConfig) 
//         this.oAuthService.logoutUrl = 'http://localhost:4200/l' 
//         console.log("codeflowww");
//         this.oAuthService.loadDiscoveryDocument().then(() => { 
//             this.oAuthService.tryLoginImplicitFlow().then(() => {
//                 if(!this.oAuthService.hasValidAccessToken()) { 
                   
                    
//                     this.oAuthService.initLoginFlow() // oAuthService.getIdToken(); 
//                     this.abc = this.oAuthService.getAccessTokenExpiration(); 
//                     console.log("insideeee",this.abc)
//                 }else { 
                    
//                     this.oAuthService.loadUserProfile().then((userProfile) => { 
//                         console.log( JSON.stringify(userProfile)); 
//                         this.userProfileSubject.next(userProfile as UserInfo)  
//                         this.abc = this.oAuthService.getIdToken();     
//                         console.log("elsee",this.abc); 
//                         console.log(this.abc)
                        
//                     })
//                 }   
//             })
//          })
//         } 
//         isLoggedIn():boolean 
//         {
//              return this.oAuthService.hasValidAccessToken() 
//             }
//             signOut() {
//                  this.oAuthService.logOut() 
//                 }
// }





// // else { 
// //     this.oAuthService.loadUserProfile().then((userProfile) => { 
// //         console.log( JSON.stringify(userProfile)); 
// //         this.userProfileSubject.next(userProfile as UserInfo) 
// //         //console.log("Data: " + this.demo['info']); 
// //         //this.abc2 = this.demo.info; 
// //         //console.log(loaduserProfile);
// //         this.abc = this.oAuthService.getIdToken(); 
// //         // console.log("token idd");
        
// //         console.log(this.abc); 
// //         // console.log("token end");
        
// //         // this.login.login(this.abc).subscribe((response: any) => { 
// //         //     this.authorized = response; 
// //         // })
// //         // console.log("authhhhh",this.authorized); 
// //     })
// // } 