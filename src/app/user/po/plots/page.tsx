import plotCSS from "./plots.module.css";

export default function POPlotsPage() {
  return (
    <>
      <div className={plotCSS.mainContainer}>
        {/* Top bar */}
        <div className={plotCSS.actionBar}>
          <div className={plotCSS.searchContainer}>
            <div className={plotCSS.searchIcon}>
            <div><i
              className={`fa-solid fa-magnifying-glass`}
            ></i></div>
            </div>
            <input
              className={plotCSS.search}
              type="search"
              placeholder="Search"
            />
          </div>
          <div className={plotCSS.addPlotBtn}>
            <i className="fa-solid fa-plus"></i> New plot
          </div>
        </div>
        {/* Top bar ends */}
        </div>

        {/* Cards section */}
        <div className="container-fluid">
            <div className="row">

                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
                {/* Plot card */}
                <div className="col-lg-3">
                    <div className={ plotCSS.card }>
                        <div className={ plotCSS.photo}></div>
                        <div className={ plotCSS.cardContent}>
                            <div className={ plotCSS.name}>Land title will be kept here</div>
                        <div className={ plotCSS.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className={ plotCSS.footer}>
                            <div className={ plotCSS.price }>₹50 per hour</div>
                            <div className={ plotCSS.icons }>
                            <div className={ plotCSS.edit }>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={ plotCSS.delete }>
                            <i className="fa-solid fa-trash"></i>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  );
}
