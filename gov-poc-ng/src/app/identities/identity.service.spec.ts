import {IdentityService} from './identities.service';
import {async, TestBed} from '@angular/core/testing';
import * as moment from 'moment';
import {Identity} from './identity/identity';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('IdentityServiceComponent', () => {
  let identityService: IdentityService;
  let identities: Identity[];
  let httpMock: HttpTestingController;
  const getIdentitiesURL = 'http://localhost:9999/identity-service/identities';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IdentityService
      ]
    });
    identityService = TestBed.get(IdentityService);
    httpMock = TestBed.get(HttpTestingController);
  });

  identities = [
    {
      id: 'MUZAn09876',
      identityRef: '6678944',
      name: 'Artemas',
      surname: 'Muzanenhamo',
      birthDate: moment.utc('28/03/1990', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('01/01/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    },
    {
      id: 'TAKUn09876',
      identityRef: '9478966',
      name: 'Takudzwa',
      surname: 'Matse',
      birthDate: moment.utc('19/01/1980', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('18/05/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    },
    {
      id: 'THOMn09876',
      identityRef: '9978933',
      name: 'Thomas',
      surname: 'Smith',
      birthDate: moment.utc('05/05/1989', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('20/03/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    },
    {
      id: 'GIANn09876',
      identityRef: '1178900',
      name: 'Giannis',
      surname: 'Marks',
      birthDate: moment.utc('12/06/2000', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('06/04/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    }
  ];


  it('should return 4 identities in total', async( () => {
    // expect(identityService.getIdentities()).toBe(4);
    identityService.getIdentities()
      .subscribe(
        data => expect(data).toBe(identities)
      );

    const req = httpMock.expectOne(getIdentitiesURL);
    expect(req.request.method).toEqual('GET');
    req.flush(identities);
    httpMock.verify();
  }));
  it('should return a single License', async ( () => {
    identityService.getIdentity(1)
      .subscribe(id => expect(id.name).toBe('Artemas'));

    const req = httpMock.expectOne(getIdentitiesURL + '/reference');
    expect(req.request.method).toEqual('POST');
    req.flush(identities[0]);
    httpMock.verify();
  }));
  it('should return a 200 when you add a valid identity', async ( () => {
    const myIdentity: Identity = {
      id: 'XIT40034',
      identityRef: '432133',
      name: 'Taku',
      surname: 'Mzee',
      birthDate: moment.utc('28/03/1990', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('01/01/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    };

    identityService.addIdentity(myIdentity)
      .subscribe();

    const req = httpMock.expectOne(getIdentitiesURL);
    expect(req.request.method).toEqual('POST');
    req.flush(identities);
    httpMock.verify();
  }));
  it('should update an identity', async ( () => {
    const myIdentity: Identity = {
      id: 'XIT40034',
      identityRef: '2222444',
      name: 'Taku',
      surname: 'Mzee',
      birthDate: moment.utc('28/03/1990', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0],
      villageOfOrigin: 'Mashayamombe',
      placeOfBirth: 'Zimbabwe',
      dateOfIssue: moment.utc('01/01/2018', 'DD/MM/YYYY', true).toDate().toISOString().split('T')[0]
    };

    identityService.updateIdentity(myIdentity)
      .subscribe();

    const req = httpMock.expectOne(getIdentitiesURL);
    expect(req.request.method).toEqual('PUT');
    req.flush(identities);
    httpMock.verify();
  }));
});
