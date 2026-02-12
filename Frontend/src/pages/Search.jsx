import { useSearchParams } from "react-router-dom";
import { useEffect , useState } from "react";
import { searchAll } from "../api/search.api";
import Layout from "../components/Layout/Layout";
import SearchVideoList from "../components/video/SearchVideoList";
import SearchProfile from "../components/profile/SearchProfile";

const Search=()=>{
  const [params] = useSearchParams();
  const query=params.get("q");
  const [results,setResults]=useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!query) {
      setLoading(false);
      return;
    }

    const fetchResults = async()=>{
      try {
        const res=await searchAll(query);
        setResults(res.data.data);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred while searching");
        setResults(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  },[query])

  if(loading) return <Layout><p>Loading...</p></Layout>

  if(error) return <Layout><p className="text-red-500">Error: {error}</p></Layout>

  if(!results || (!results.videos?.length && !results.users?.length)) {
    return (
      <Layout>
        <div className="p-6 text-white">
          <h2 className="text-xl mb-4">Results for {query}</h2>
          <p>No results found.</p>
        </div>
      </Layout>
    );
  }

  return(
    <Layout>
      <div className="p-6 text-white">
        <h2 className="text-xl mb-4">Results for {query}</h2>
        <div>
          <h3 className="text-lg mb-2">Videos</h3>
          {results.videos?.length > 0 ? (
            <SearchVideoList videos={results.videos} />
          ) : (
            <p>No videos found.</p>
          )}
        </div>
        {results.users?.length > 0 && (
          <div>
            <h3 className="text-lg mb-2 mt-4">Users</h3>
            <div className="space-y-2">
              {results.users.map(user => (
                <SearchProfile key={user._id} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
export default Search;
