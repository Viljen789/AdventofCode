#include <iostream>
#include <map>
#include <sstream>
#include <stack>
#include <string>
#include <vector>
using namespace std;

#pragma GCC optimize("Ofast,unroll-loops")
#pragma GCC target("avx,avx2,fma")

// -------------------------<Debugging>-------------------------
template <typename A, typename B>
ostream &operator<<(ostream &os, const pair<A, B> &p);

template <typename T_container, typename T = typename enable_if<
                                    !is_same<T_container, string>::value,
                                    typename T_container::value_type>::type>
ostream &operator<<(ostream &os, const T_container &v);

template <typename A, typename B>
ostream &operator<<(ostream &os, const pair<A, B> &p) {
  return os << '(' << p.first << ", " << p.second << ')';
}

template <typename T_container, typename T>
ostream &operator<<(ostream &os, const T_container &v) {
  os << '{';
  string sep;
  for (const T &x : v)
    os << sep << x, sep = ", ";
  return os << '}';
}
void dbg_out() { cerr << endl; }
template <typename Head, typename... Tail> void dbg_out(Head H, Tail... T) {
  cerr << ' ' << H;
  dbg_out(T...);
}

#ifdef LOCAL
#define dbg(...) cerr << "(" << #__VA_ARGS__ << "):", dbg_out(__VA_ARGS__)
#else
#define dbg(...)
#endif

// -------------------------<Macros>-------------------------
#define pb push_back
#define ar array
#define mp make_pair
#define f first
#define s second
#define ll long long
#define ld long double
#define sza(x) ((int)x.size())
#define gc getchar_unlocked
#define fo(i, n) for (i = 0; i < n; i++)
#define Fo(i, k, n) for (i = k; k < n ? i < n : i > n; k < n ? i += 1 : i -= 1)
#define ll long long
#define db(x) cout << #x << "=" << x << endl
#define deb2(x, y) cout << #x << "=" << x << "," << #y << "=" << y << endl
#define deb3(x, y, z)                                                          \
  cout << #x << "=" << x << "," << #y << "=" << y << "," << #z << "=" << z     \
       << endl

const int MAX_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

// -------------------------<RNG>-------------------------
// mt19937 RNG(chrono::steady_clock::now().time_since_epoch().count());
// #define SHUF(v) shuffle(all(v), RNG);

// -------------------------<Solve>-------------------------

unordered_map<string, vector<string>> entryMap;
vector<string> start;
vector<string> svrStart;
vector<pair<string, vector<string>>> entries;

void processData() {
  string line;
  while (getline(cin, line)) {
    stringstream ss(line);
    string source;
    vector<string> sinks;
    ss >> source;
    source = source.substr(0, 3);
    while (ss >> line) {
      sinks.pb(line);
    }
    entryMap[source] = sinks;
    entries.pb({source, sinks});
  }
}

void solvep1() {
  // deb2(entries, start);
  ll tot = 0;
  // cout << entryMap << endl;

  stack<vector<string>> dfsStack;
  dfsStack.push(entryMap["you"]);
  while (!dfsStack.empty()) {
    vector<string> dest = dfsStack.top();
    // deb2(dest, dfsStack.top());
    dfsStack.pop();
    if (dest.size() == 1 && dest[0] == "out") {
      tot++;
      continue;
    }
    for (auto d : dest) {
      dfsStack.push(entryMap[d]);
    }
  }
  cout << "Part 1: " << tot << endl;

  // for (auto [source, sinks] : entries) {
  //   cout << source << " -> ";
  //   for (auto sink : sinks) {
  //     cout << sink << " ";
  //   }
  //   cout << endl;
  // }
}
unordered_map<string, ll> memo[2][2];

ll dfs(const string &u, bool dac, bool fft) {
  bool curdac = dac || (u == "dac");
  bool curfft = fft || (u == "fft");

  if (u == "out") {
    return (curdac && curfft) ? 1 : 0;
  }
  auto &m = memo[curdac][curfft];

  if (m.count(u))
    return m[u];
  ll res = 0;
  for (const string &v : entryMap[u]) {
    res += dfs(v, curdac, curfft);
  }
  return m[u] = res;
}

void solvep2() {
  string start = "svr";
  ll tot = dfs(start, 0, 0);
  cout << "Part 2: " << tot << endl;
  // cout << entryMap<< endl;
  // for (auto [key, value] : memo) {
  //     cout << key << " -> " << value << endl;
  // }
}

int main() {
#ifndef ONLINE_JUDGE
  freopen("Day11.txt", "r", stdin);
#endif

  ios_base::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);
  processData();
  solvep1();
  solvep2();
  return 0;
}