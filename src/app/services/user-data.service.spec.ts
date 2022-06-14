import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 

import { UserMock } from '../mocks/user-mock';
import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('UserDataService', () => {
  // We declare the variables that we'll use for the Test Service
  let service: UserDataService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserDataService);

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let url ='https://randomuser.me/api?seed=foobar+&inc=gender';
  let user = new UserMock();
  let mockUserArray = user.mockdata;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  /// Tests begin ///

  it('can get data from API', () => {
    const testData: Data = mockUserArray;
  
    // Make an HTTP GET request
    httpClient.get<Data>(url)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
  
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('https://randomuser.me/api?seed=foobar+&inc=gender');
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
  
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});



  
