#!/usr/bin/env python3
"""
Backend API Testing for Anime Quotes Website
Tests all API endpoints with comprehensive validation
"""

import requests
import json
import sys
from typing import Dict, List, Any

# Backend URL from frontend/.env
BASE_URL = "https://manga-wisdom.preview.emergentagent.com/api"

class AnimeQuotesAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details
        }
        self.test_results.append(result)
        if not success:
            self.failed_tests.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
    
    def make_request(self, endpoint: str, expected_status: int = 200) -> Dict[str, Any]:
        """Make HTTP request and return response data"""
        try:
            url = f"{self.base_url}{endpoint}"
            print(f"Testing: GET {url}")
            response = requests.get(url, timeout=10)
            
            return {
                "status_code": response.status_code,
                "data": response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text,
                "success": response.status_code == expected_status
            }
        except requests.exceptions.RequestException as e:
            return {
                "status_code": 0,
                "data": str(e),
                "success": False
            }
        except json.JSONDecodeError as e:
            return {
                "status_code": response.status_code,
                "data": f"JSON decode error: {str(e)}",
                "success": False
            }
    
    def test_anime_endpoints(self):
        """Test all anime-related endpoints"""
        print("\n=== Testing Anime Endpoints ===")
        
        # Test 1: GET /api/anime - Should return list of all anime series
        response = self.make_request("/anime")
        if response["success"]:
            anime_list = response["data"]
            if isinstance(anime_list, list) and len(anime_list) > 0:
                # Check if we have expected anime
                anime_slugs = [anime.get("slug") for anime in anime_list]
                expected_anime = ["one-piece", "naruto", "bleach", "hunter-x-hunter"]
                found_anime = [slug for slug in expected_anime if slug in anime_slugs]
                
                if len(found_anime) >= 2:  # At least 2 expected anime found
                    self.log_test("GET /api/anime - Returns anime list", True, 
                                f"Found {len(anime_list)} anime series including {found_anime}")
                else:
                    self.log_test("GET /api/anime - Returns anime list", False, 
                                f"Expected anime not found. Got: {anime_slugs}")
            else:
                self.log_test("GET /api/anime - Returns anime list", False, 
                            f"Expected list with data, got: {type(anime_list)}")
        else:
            self.log_test("GET /api/anime - Returns anime list", False, 
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 2: GET /api/anime/one-piece - Should return One Piece details
        response = self.make_request("/anime/one-piece")
        if response["success"]:
            anime = response["data"]
            if isinstance(anime, dict) and anime.get("slug") == "one-piece":
                required_fields = ["name", "slug", "japanese_name", "description"]
                missing_fields = [field for field in required_fields if field not in anime]
                if not missing_fields:
                    self.log_test("GET /api/anime/one-piece - Returns One Piece details", True,
                                f"Name: {anime.get('name')}, Japanese: {anime.get('japanese_name')}")
                else:
                    self.log_test("GET /api/anime/one-piece - Returns One Piece details", False,
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/anime/one-piece - Returns One Piece details", False,
                            f"Invalid response structure: {anime}")
        else:
            self.log_test("GET /api/anime/one-piece - Returns One Piece details", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 3: GET /api/anime/naruto - Should return Naruto details
        response = self.make_request("/anime/naruto")
        if response["success"]:
            anime = response["data"]
            if isinstance(anime, dict) and anime.get("slug") == "naruto":
                self.log_test("GET /api/anime/naruto - Returns Naruto details", True,
                            f"Name: {anime.get('name')}")
            else:
                self.log_test("GET /api/anime/naruto - Returns Naruto details", False,
                            f"Invalid response: {anime}")
        else:
            self.log_test("GET /api/anime/naruto - Returns Naruto details", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 4: GET /api/anime/invalid-slug - Should return 404
        response = self.make_request("/anime/invalid-slug", expected_status=404)
        if response["success"]:
            self.log_test("GET /api/anime/invalid-slug - Returns 404", True, "Correctly returns 404")
        else:
            self.log_test("GET /api/anime/invalid-slug - Returns 404", False,
                        f"Expected 404, got {response['status_code']}")
    
    def test_character_endpoints(self):
        """Test all character-related endpoints"""
        print("\n=== Testing Character Endpoints ===")
        
        # Test 5: GET /api/characters - Should return all characters
        response = self.make_request("/characters")
        if response["success"]:
            characters = response["data"]
            if isinstance(characters, list) and len(characters) > 0:
                # Check for expected characters
                character_slugs = [char.get("slug") for char in characters]
                expected_chars = ["monkey-d-luffy", "naruto-uzumaki", "ichigo-kurosaki"]
                found_chars = [slug for slug in expected_chars if slug in character_slugs]
                
                if len(found_chars) >= 2:
                    self.log_test("GET /api/characters - Returns all characters", True,
                                f"Found {len(characters)} characters including {found_chars}")
                else:
                    self.log_test("GET /api/characters - Returns all characters", False,
                                f"Expected characters not found. Got: {character_slugs[:5]}")
            else:
                self.log_test("GET /api/characters - Returns all characters", False,
                            f"Expected list with data, got: {type(characters)}")
        else:
            self.log_test("GET /api/characters - Returns all characters", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 6: GET /api/characters?anime_slug=one-piece - Should filter by One Piece
        response = self.make_request("/characters?anime_slug=one-piece")
        if response["success"]:
            characters = response["data"]
            if isinstance(characters, list):
                # All characters should be from One Piece
                one_piece_chars = [char for char in characters if char.get("anime_slug") == "one-piece"]
                if len(one_piece_chars) == len(characters) and len(characters) > 0:
                    char_names = [char.get("name") for char in characters]
                    self.log_test("GET /api/characters?anime_slug=one-piece - Filters by One Piece", True,
                                f"Found {len(characters)} One Piece characters: {char_names}")
                else:
                    self.log_test("GET /api/characters?anime_slug=one-piece - Filters by One Piece", False,
                                f"Filter not working properly. Got {len(characters)} total, {len(one_piece_chars)} from One Piece")
            else:
                self.log_test("GET /api/characters?anime_slug=one-piece - Filters by One Piece", False,
                            f"Expected list, got: {type(characters)}")
        else:
            self.log_test("GET /api/characters?anime_slug=one-piece - Filters by One Piece", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 7: GET /api/characters/monkey-d-luffy - Should return Luffy details
        response = self.make_request("/characters/monkey-d-luffy")
        if response["success"]:
            character = response["data"]
            if isinstance(character, dict) and character.get("slug") == "monkey-d-luffy":
                required_fields = ["name", "slug", "anime", "anime_slug"]
                missing_fields = [field for field in required_fields if field not in character]
                if not missing_fields:
                    self.log_test("GET /api/characters/monkey-d-luffy - Returns Luffy details", True,
                                f"Name: {character.get('name')}, Anime: {character.get('anime')}")
                else:
                    self.log_test("GET /api/characters/monkey-d-luffy - Returns Luffy details", False,
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/characters/monkey-d-luffy - Returns Luffy details", False,
                            f"Invalid response: {character}")
        else:
            self.log_test("GET /api/characters/monkey-d-luffy - Returns Luffy details", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 8: GET /api/characters/invalid-slug - Should return 404
        response = self.make_request("/characters/invalid-slug", expected_status=404)
        if response["success"]:
            self.log_test("GET /api/characters/invalid-slug - Returns 404", True, "Correctly returns 404")
        else:
            self.log_test("GET /api/characters/invalid-slug - Returns 404", False,
                        f"Expected 404, got {response['status_code']}")
    
    def test_quote_endpoints(self):
        """Test all quote-related endpoints"""
        print("\n=== Testing Quote Endpoints ===")
        
        # Test 9: GET /api/quotes - Should return all quotes
        response = self.make_request("/quotes")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list) and len(quotes) > 0:
                # Check quote structure
                sample_quote = quotes[0]
                required_fields = ["text", "character", "anime", "character_slug", "anime_slug"]
                missing_fields = [field for field in required_fields if field not in sample_quote]
                if not missing_fields:
                    self.log_test("GET /api/quotes - Returns all quotes", True,
                                f"Found {len(quotes)} quotes with proper structure")
                else:
                    self.log_test("GET /api/quotes - Returns all quotes", False,
                                f"Quote missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/quotes - Returns all quotes", False,
                            f"Expected list with data, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes - Returns all quotes", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 10: GET /api/quotes?anime_slug=naruto - Should filter by Naruto
        response = self.make_request("/quotes?anime_slug=naruto")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                naruto_quotes = [q for q in quotes if q.get("anime_slug") == "naruto"]
                if len(naruto_quotes) == len(quotes) and len(quotes) > 0:
                    self.log_test("GET /api/quotes?anime_slug=naruto - Filters by Naruto", True,
                                f"Found {len(quotes)} Naruto quotes")
                else:
                    self.log_test("GET /api/quotes?anime_slug=naruto - Filters by Naruto", False,
                                f"Filter not working. Got {len(quotes)} total, {len(naruto_quotes)} from Naruto")
            else:
                self.log_test("GET /api/quotes?anime_slug=naruto - Filters by Naruto", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes?anime_slug=naruto - Filters by Naruto", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 11: GET /api/quotes?character_slug=ichigo-kurosaki - Should filter by Ichigo
        response = self.make_request("/quotes?character_slug=ichigo-kurosaki")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                ichigo_quotes = [q for q in quotes if q.get("character_slug") == "ichigo-kurosaki"]
                if len(ichigo_quotes) == len(quotes):
                    self.log_test("GET /api/quotes?character_slug=ichigo-kurosaki - Filters by Ichigo", True,
                                f"Found {len(quotes)} Ichigo quotes")
                else:
                    self.log_test("GET /api/quotes?character_slug=ichigo-kurosaki - Filters by Ichigo", False,
                                f"Filter not working. Got {len(quotes)} total, {len(ichigo_quotes)} from Ichigo")
            else:
                self.log_test("GET /api/quotes?character_slug=ichigo-kurosaki - Filters by Ichigo", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes?character_slug=ichigo-kurosaki - Filters by Ichigo", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 12: GET /api/quotes?category=motivation - Should filter by category
        response = self.make_request("/quotes?category=motivation")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                motivation_quotes = [q for q in quotes if q.get("category") == "motivation"]
                if len(motivation_quotes) == len(quotes) and len(quotes) > 0:
                    self.log_test("GET /api/quotes?category=motivation - Filters by category", True,
                                f"Found {len(quotes)} motivation quotes")
                else:
                    self.log_test("GET /api/quotes?category=motivation - Filters by category", False,
                                f"Filter not working. Got {len(quotes)} total, {len(motivation_quotes)} motivation")
            else:
                self.log_test("GET /api/quotes?category=motivation - Filters by category", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes?category=motivation - Filters by category", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 13: GET /api/quotes?featured=true - Should return only featured quotes
        response = self.make_request("/quotes?featured=true")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                featured_quotes = [q for q in quotes if q.get("featured") == True]
                if len(featured_quotes) == len(quotes) and len(quotes) > 0:
                    self.log_test("GET /api/quotes?featured=true - Returns only featured quotes", True,
                                f"Found {len(quotes)} featured quotes")
                else:
                    self.log_test("GET /api/quotes?featured=true - Returns only featured quotes", False,
                                f"Filter not working. Got {len(quotes)} total, {len(featured_quotes)} featured")
            else:
                self.log_test("GET /api/quotes?featured=true - Returns only featured quotes", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes?featured=true - Returns only featured quotes", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 14: GET /api/quotes/featured - Should return featured quotes
        response = self.make_request("/quotes/featured")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                featured_quotes = [q for q in quotes if q.get("featured") == True]
                if len(featured_quotes) == len(quotes) and len(quotes) > 0:
                    self.log_test("GET /api/quotes/featured - Returns featured quotes", True,
                                f"Found {len(quotes)} featured quotes")
                else:
                    self.log_test("GET /api/quotes/featured - Returns featured quotes", False,
                                f"Not all quotes are featured. Got {len(quotes)} total, {len(featured_quotes)} featured")
            else:
                self.log_test("GET /api/quotes/featured - Returns featured quotes", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes/featured - Returns featured quotes", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
    
    def test_search_endpoints(self):
        """Test search functionality"""
        print("\n=== Testing Search Endpoints ===")
        
        # Test 15: GET /api/quotes/search?q=freedom - Should search for "freedom"
        response = self.make_request("/quotes/search?q=freedom")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                # Check if results contain "freedom" in text, character, anime, or category
                freedom_matches = []
                for quote in quotes:
                    text = quote.get("text", "").lower()
                    character = quote.get("character", "").lower()
                    anime = quote.get("anime", "").lower()
                    category = quote.get("category", "").lower()
                    if "freedom" in text or "freedom" in character or "freedom" in anime or "freedom" in category:
                        freedom_matches.append(quote)
                
                if len(freedom_matches) > 0:
                    self.log_test("GET /api/quotes/search?q=freedom - Searches for freedom", True,
                                f"Found {len(freedom_matches)} quotes containing 'freedom'")
                else:
                    self.log_test("GET /api/quotes/search?q=freedom - Searches for freedom", False,
                                f"No quotes found containing 'freedom'. Got {len(quotes)} results")
            else:
                self.log_test("GET /api/quotes/search?q=freedom - Searches for freedom", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes/search?q=freedom - Searches for freedom", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 16: GET /api/quotes/search?q=luffy - Should search for "luffy"
        response = self.make_request("/quotes/search?q=luffy")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list):
                luffy_matches = []
                for quote in quotes:
                    text = quote.get("text", "").lower()
                    character = quote.get("character", "").lower()
                    anime = quote.get("anime", "").lower()
                    category = quote.get("category", "").lower()
                    if "luffy" in text or "luffy" in character or "luffy" in anime or "luffy" in category:
                        luffy_matches.append(quote)
                
                if len(luffy_matches) > 0:
                    self.log_test("GET /api/quotes/search?q=luffy - Searches for luffy", True,
                                f"Found {len(luffy_matches)} quotes containing 'luffy'")
                else:
                    self.log_test("GET /api/quotes/search?q=luffy - Searches for luffy", False,
                                f"No quotes found containing 'luffy'. Got {len(quotes)} results")
            else:
                self.log_test("GET /api/quotes/search?q=luffy - Searches for luffy", False,
                            f"Expected list, got: {type(quotes)}")
        else:
            self.log_test("GET /api/quotes/search?q=luffy - Searches for luffy", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
        
        # Test 17: GET /api/quotes/search?q=xyz123 - Should return empty results
        response = self.make_request("/quotes/search?q=xyz123")
        if response["success"]:
            quotes = response["data"]
            if isinstance(quotes, list) and len(quotes) == 0:
                self.log_test("GET /api/quotes/search?q=xyz123 - Returns empty results", True,
                            "Correctly returns empty list for non-existent search term")
            else:
                self.log_test("GET /api/quotes/search?q=xyz123 - Returns empty results", False,
                            f"Expected empty list, got {len(quotes) if isinstance(quotes, list) else type(quotes)}")
        else:
            self.log_test("GET /api/quotes/search?q=xyz123 - Returns empty results", False,
                        f"Status: {response['status_code']}, Error: {response['data']}")
    
    def test_database_seeding(self):
        """Test that database is properly seeded"""
        print("\n=== Testing Database Seeding ===")
        
        # Check if we have data in all collections
        endpoints_to_check = [
            ("/anime", "anime series"),
            ("/characters", "characters"),
            ("/quotes", "quotes")
        ]
        
        for endpoint, data_type in endpoints_to_check:
            response = self.make_request(endpoint)
            if response["success"]:
                data = response["data"]
                if isinstance(data, list) and len(data) > 0:
                    self.log_test(f"Database seeding - {data_type}", True,
                                f"Found {len(data)} {data_type}")
                else:
                    self.log_test(f"Database seeding - {data_type}", False,
                                f"No {data_type} found in database")
            else:
                self.log_test(f"Database seeding - {data_type}", False,
                            f"Failed to fetch {data_type}: {response['data']}")
    
    def run_all_tests(self):
        """Run all tests and generate report"""
        print("🚀 Starting Anime Quotes API Backend Testing")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_database_seeding()
        self.test_anime_endpoints()
        self.test_character_endpoints()
        self.test_quote_endpoints()
        self.test_search_endpoints()
        
        # Generate summary report
        self.generate_report()
    
    def generate_report(self):
        """Generate final test report"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY REPORT")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n🚨 FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"{i}. {test['test']}")
                print(f"   Details: {test['details']}")
        
        print("\n" + "=" * 60)
        
        # Return success status
        return failed_tests == 0


def main():
    """Main function to run tests"""
    tester = AnimeQuotesAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()